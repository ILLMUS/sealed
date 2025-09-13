// contact.js in netlify/functions
const fetch = require("node-fetch"); // needed to call Airtable API

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Step 1: Parse incoming form data
    const { name, email, message } = JSON.parse(event.body);
    console.log("Incoming data:", { name, email, message });

    // Step 2: Validate required fields
    if (!name || !email || !message) {
      console.warn("❌ Missing required fields");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "❌ Missing required fields" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // Step 3: Airtable configuration
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_TABLE = "RST-Sealed"; // Replace with your actual table name

    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      console.error("❌ Airtable environment variables missing");
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "❌ Airtable not configured" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // Step 4: Send data to Airtable
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
    console.log("Airtable response:", airtableData);

    if (airtableData.error) {
      console.error("❌ Airtable error:", airtableData.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "❌ Airtable error." }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // Step 5: Success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Thank you! Your message was received and saved.",
      }),
      headers: { "Content-Type": "application/json" },
    };

  } catch (err) {
    console.error("❌ Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Something went wrong." }),
      headers: { "Content-Type": "application/json" },
    };
  }
}
