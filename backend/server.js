require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const claudeKey = process.env.CLAUDE_API_KEY;
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

async function getSummary(text) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': claudeKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            max_tokens: 500,
            model: 'claude-sonnet-4-20250514',
            system: "You are a concise summarization assistant. Always produce short, accurate summaries. Talk like you are explaining to someone who is not familiar with the paper.",
            messages: [{
                role: 'user',
                content: `Please provide a concise summary of the following text:\n\n${text}`
            }]
        })
    });
    const data = await response.json();
    return data.content[0].text;
}

app.post("/summarize", async (req, res) => {
    console.log("Backend received text:", req.body.text);
    const summary = await getSummary(req.body.text);
    res.json({ summary });
});

app.listen(port);