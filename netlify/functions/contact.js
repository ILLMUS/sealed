import fetch from "node-fetch"; // for Netlify ES Modules

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, message, formType } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "❌ Name, email, and message are required." }),
      };
    }

    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_NAME;
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Message: message,
            FormType: formType || "ContactForm",
            // Date removed for now
          },
        }),
      }
    );

    const airtableData = await airtableRes.json();

    if (airtableData.error) {
      console.error("❌ Airtable error:", airtableData.error);
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "❌ Airtable error: " + JSON.stringify(airtableData.error) }),
      };
    }
 
    console.log(" Airtable response:", airtableData);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: " Thank you! Your message has been sent. Read your email for confirmation." }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "❌ Something went wrong." }),
    };
  }
}
