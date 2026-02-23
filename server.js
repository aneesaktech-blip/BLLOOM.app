import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 3000;

// ===== Put your API key here directly =====
const OPENAI_API_KEY = "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";

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serve index.html and ai-chat.js

// ===== Chat route =====
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const client = new OpenAI({ apiKey: OPENAI_API_KEY });

        const completion = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are biAX, AI assistant for Blloom clothing brand." },
                { role: "user", content: userMessage }
            ],
            max_tokens: 300
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.json({ reply: "AI error occurred." });
    }
});

// ===== Start server =====
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
