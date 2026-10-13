// Cloudflare Pages Function: /api/chat
import { CHATBOT_SYSTEM_PROMPT } from '../../src/data/chatbotKnowledge';

export async function onRequestGet() {
  return new Response(JSON.stringify({ status: 'active', assistant: 'Sunil Khobragade AI' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  const { request, env } = context;
  const apiKey = env.GROQ_API_KEY;
  const model = env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'No GROQ_API_KEY configured on Cloudflare environment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawText = await request.text();
    let clientMessages: Array<{ role: string; content: string }> = [];

    if (rawText && rawText.trim().length > 0) {
      try {
        const body = JSON.parse(rawText);
        if (Array.isArray(body.messages)) {
          clientMessages = body.messages;
        }
      } catch (parseErr) {
        console.warn('JSON parsing error in /api/chat:', parseErr);
      }
    }

    // Filter and sanitize messages from client
    const sanitizedMessages = clientMessages
      .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
      .map((m) => ({
        role: m.role,
        content: m.role === 'assistant'
          ? (m.content.length > 250 ? m.content.slice(0, 250) + '...' : m.content)
          : m.content.slice(0, 2000),
      }))
      .slice(-4);

    const conversation = [
      {
        role: 'system',
        content: CHATBOT_SYSTEM_PROMPT,
      },
      ...sanitizedMessages,
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: conversation,
        temperature: 0.1,
        max_tokens: 800,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: 'AI provider error', details: errText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
