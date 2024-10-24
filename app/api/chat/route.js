import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID, // Your OpenAI organization ID
  apiKey: process.env.OPENAI_API_KEY,      // Your OpenAI API key
});

export async function POST(req) {
  try {
    const { message } = await req.json(); // Get the user message from the request body

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Make the OpenAI API call for chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Choose the correct model
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const aiResponse = response.choices[0]?.message?.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
    return new Response(JSON.stringify({ error: "Error communicating with OpenAI" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
