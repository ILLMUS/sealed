export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, message, formType } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "❌ Name, email, and message are required." })
      };
    }

    console.log("➡️ New contact message:", { name, email, message, formType });

    const resp = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Message: message,
            FormType: formType || "ContactForm",
            Date: new Date().toISOString()
          }
        })
      }
    );

    const result = await resp.json();
    console.log("➡️ Airtable response:", result);

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ message: "❌ Airtable error", error: result })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Thank you! Your message has been saved to Airtable!" })
    };

  } catch (err) {
    console.error("❌ Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Something went wrong." })
    };
  }
}
