import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (!req.body || !req.body.message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are biAX, AI assistant for BLLOOM clothing brand.",
        },
        {
          role: "user",
          content: req.body.message,
        },
      ],
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      reply: error.message || "Server crashed.",
    });
  }
}
