import type { APIRoute } from 'astro';
import { CHATBOT_SYSTEM_PROMPT } from '../../data/chatbotKnowledge';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ status: 'active', assistant: 'Sunil Khobragade AI' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || import.meta.env.GROQ_MODEL || 'openai/gpt-oss-120b';

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'No GROQ_API_KEY configured on server' }), {
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
        content: m.content.slice(0, 4000), // Protect against payload bloat
      }));

    // Ensure system prompt with full knowledge base is at index 0
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
        temperature: 0.2,
        max_tokens: 1200,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API Error:', response.status, errText);
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
    console.error('API /api/chat exception:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
