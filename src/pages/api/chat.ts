import type { APIRoute } from 'astro';

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
    const { messages } = await request.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          ...messages,
          {
            role: 'system',
            content: "You are exclusively the AI assistant for Sunil Khobragade and his portfolio. You must ONLY answer questions directly related to Sunil Khobragade, his technical skills, work experience, projects, education, and hiring availability. If the user asks general, off-topic, or unrelated questions, politely decline and guide them back to Sunil's portfolio. Answer completely what was asked—neither too short nor too long."
          }
        ],
        temperature: 0.35,
        max_tokens: 450,
        stream: true,
      }),
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
