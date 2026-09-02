---
title: "Production RAG Pipelines with pgvector & PostgreSQL"
description: "Building high-performance semantic retrieval pipelines, HNSW indexing, and hybrid lexical search."
date: 2025-01-22
tags: ["AI", "pgvector", "PostgreSQL", "RAG"]
---

While dedicated vector databases exist, running `pgvector` directly inside PostgreSQL eliminates dual-database synchronization lag, lets you combine vector similarity with relational SQL filters, and simplifies infrastructure.

## pgvector Schema & HNSW Indexing

Hierarchical Navigable Small World (HNSW) indexes provide order-of-magnitude faster vector searches compared to traditional IVFFlat indexes without requiring a pre-warmed training step.

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create Knowledge Document Chunks Table (1536-dim embeddings for OpenAI / Groq)
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create HNSW Cosine Distance Index
CREATE INDEX idx_document_embeddings_hnsw_cosine
ON document_embeddings
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

## Hybrid Search: Cosine Similarity + Reciprocal Rank Fusion (RRF)

```sql
WITH vector_search AS (
  SELECT id, content, 
         1 - (embedding <=> $1::vector) AS vector_similarity,
         ROW_NUMBER() OVER (ORDER BY embedding <=> $1::vector) AS v_rank
  FROM document_embeddings
  WHERE organization_id = $2
  LIMIT 20
),
text_search AS (
  SELECT id, content,
         ts_rank_cd(to_tsvector('english', content), plainto_tsquery('english', $3)) AS text_rank,
         ROW_NUMBER() OVER (ORDER BY ts_rank_cd(to_tsvector('english', content), plainto_tsquery('english', $3)) DESC) AS t_rank
  FROM document_embeddings
  WHERE organization_id = $2 AND to_tsvector('english', content) @@ plainto_tsquery('english', $3)
  LIMIT 20
)
SELECT COALESCE(v.id, t.id) AS id,
       COALESCE(v.content, t.content) AS content,
       (COALESCE(1.0 / (60 + v.v_rank), 0.0) + COALESCE(1.0 / (60 + t.t_rank), 0.0)) AS combined_score
FROM vector_search v
FULL OUTER JOIN text_search t ON v.id = t.id
ORDER BY combined_score DESC
LIMIT 5;
```

## Summary

- HNSW indexes dramatically outperform IVFFlat on recall accuracy and latency.
- Hybrid search (BM25 lexical + vector cosine) solves domain-specific acronym misses in pure vector search.
