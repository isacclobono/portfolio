import type { APIRoute } from 'astro';

const DEFAULT_EVENT_TYPE_URI = 'https://api.calendly.com/event_types/c85fa066-9ed8-4031-9d3a-7eafb2a56c47';

function getCalendlyToken(): string | undefined {
  return import.meta.env.CALENDLY_API_TOKEN || (typeof process !== 'undefined' ? process.env?.CALENDLY_API_TOKEN : undefined);
}

export const GET: APIRoute = async ({ url }) => {
  const token = getCalendlyToken();
  const startTime = url.searchParams.get('start_time');
  const endTime = url.searchParams.get('end_time');
  const eventType = url.searchParams.get('event_type') || DEFAULT_EVENT_TYPE_URI;

  if (!token) {
    return new Response(
      JSON.stringify({
        collection: [],
        status: 'mock_or_unconfigured',
        message: 'Calendly token is not configured on the server environment. Please set CALENDLY_API_TOKEN in environment variables.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      }
    );
  }

  if (!startTime || !endTime) {
    return new Response(
      JSON.stringify({ error: 'start_time and end_time query parameters are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const targetUrl = `https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(eventType)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`;
    const response = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch availability from Calendly', details: error instanceof Error ? error.message : String(error) }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const token = getCalendlyToken();

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'CALENDLY_API_TOKEN environment variable is not configured on the server.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { name, email, start_time, notes, timezone, event_type } = body;

    if (!name || !email || !start_time) {
      return new Response(
        JSON.stringify({ error: 'name, email, and start_time are required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload: Record<string, any> = {
      event_type: event_type || DEFAULT_EVENT_TYPE_URI,
      start_time,
      location: { kind: 'google_conference' },
      invitee: {
        name,
        email,
        timezone: timezone || 'Asia/Kolkata'
      }
    };

    if (notes) {
      payload.questions_and_answers = [
        {
          question: 'Please share anything that will help prepare for our meeting.',
          answer: notes,
          position: 0
        }
      ];
    }

    const response = await fetch('https://api.calendly.com/invitees', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Booking submission failed', details: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
