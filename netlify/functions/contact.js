const fetch = require("node-fetch"); // needed for Airtable POST

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, message } = data;

    // Check required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "❌ Missing required fields" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    console.log("✅ New message received:", { name, email, message });

    // --- Airtable Integration ---
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID; // set in Netlify env
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY; // set in Netlify env
    const AIRTABLE_TABLE = "RST-Sealed"; // change if your table name is different

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Message: message,
            FormType: "Contact",
            Date: new Date().toISOString(),
          },
        }),
      }
    );

    const airtableData = await airtableResponse.json();

    if (airtableData.error) {
      console.error("Airtable Error:", airtableData.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "❌ Airtable error." }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // Success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Thank you! Your message was received and saved.",
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Something went wrong." }),
      headers: { "Content-Type": "application/json" },
    };
  }
}


const res = await fetch(`https://api.airtable.com/v0/${baseId}/Leads`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    fields: {
      Name: name,
      Email: email,
      Message: message,
      Source: "Contact Form"
    }
  })
});

const data = await res.json();
if (data.error) {
  return { statusCode: 500, body: JSON.stringify(data.error) };
}

