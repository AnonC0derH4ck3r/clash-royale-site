// Create a file called proxy.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());

app.get("/api/player/:tag", async (req, res) => {
    const playerTag = req.params.tag;
    const encodedTag = encodeURIComponent(`#${playerTag}`);
    const url = `https://api.clashroyale.com/v1/players/${encodedTag}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`
            },
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch player data" });
    }
});

app.get("/api/player/battlelog/:tag", async (req, res) => {
    const playerTag = req.params.tag;

    if (!playerTag) {
        return res.status(400).json({ error: "Missing player tag in query" });
    }

    const encodedTag = encodeURIComponent(`#${playerTag}`);
    const url = `https://api.clashroyale.com/v1/players/${encodedTag}/battlelog`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`
            }
        });
        console.log("Status:", response.status, "URL: ", url);

        if (!response.ok) {
            const errorBody = await response.text(); // Read raw error for insight
            return res.status(response.status).json({ error: "Failed to fetch battlelog", details: errorBody });
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        if (err.name === 'AbortError') {
            return res.status(504).json({ error: "Battlelog request timed out" });
        }
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error while fetching battlelog" });
    }
});

app.get("/api/player/chests/:tag", async (req, res) => {
    const playerTag = req.params.tag;
    if (!playerTag) {
        return res.status(400).json({ error: "Missing player tag" });
    }

    const encodedTag = encodeURIComponent(`#${playerTag}`);
    const url = `https://api.clashroyale.com/v1/players/${encodedTag}/upcomingchests`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch chests" });
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching chests" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});