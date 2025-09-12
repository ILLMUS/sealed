// netlify/functions/affiliate.js
export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('affiliate function invoked - raw body:', event.body);

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, phone, location, notes } = data;

    if (!name || !email || !phone || !location) {
      console.warn('Missing required fields', { name, email, phone, location });
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '❌ Missing required fields: name, email, phone, location' })
      };
    }

    console.log('✅ New affiliate application:', { name, email, phone, location, notes });

    // TODO: send email / save to DB here

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '✅ Thanks! Your affiliate application was received.' })
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '❌ Something went wrong (server).' })
    };
  }
}
