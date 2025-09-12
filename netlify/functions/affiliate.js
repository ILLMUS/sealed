export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, location, notes } = data;

    if (!name || !email || !phone || !location) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "❌ Missing required fields" }),
        headers: { "Content-Type": "application/json" }
      };
    }

    console.log("✅ New affiliate application:", { name, email, phone, location, notes });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Thank you! Your affiliate request was received." }),
      headers: { "Content-Type": "application/json" }
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Something went wrong." }),
      headers: { "Content-Type": "application/json" }
    };
  }
}
