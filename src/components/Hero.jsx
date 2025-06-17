// Hero.jsx with Battle Log and Chest Support
import React, { useState } from "react";

export default function Hero() {
    const [tag, setTag] = useState("");
    const [playerData, setPlayerData] = useState(null);
    const [battleLog, setBattleLog] = useState([]);
    const [chests, setChests] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tag.trim()) return;

        const url = `https://clash-royale-site-backend.onrender.com/api/player/${tag.replace(/^#/, "").toUpperCase()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch player data");
            const data = await response.json();
            setPlayerData(data);
            setError(null);
            setBattleLog([]);
            setChests([]);
        } catch (err) {
            setPlayerData(null);
            setError(err.message);
        }
    };

    const handleBattleLog = async () => {
        if (!tag.trim()) return;
        const url = `https://clash-royale-site-backend.onrender.com/api/player/battlelog/${tag.replace(/^#/, "").toUpperCase()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch battle log");
            const data = await response.json();
            setBattleLog(data);
            setError(null);
        } catch (err) {
            setBattleLog([]);
            setError(err.message);
        }
    };

    const handleChests = async () => {
        if (!tag.trim()) return;
        const url = `https://clash-royale-site-backend.onrender.com/api/player/chests/${tag.replace(/^#/, "").toUpperCase()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch chests");
            const data = await response.json();
            setChests(data.items);
            setError(null);
        } catch (err) {
            setChests([]);
            setError(err.message);
        }
    };

    const getDisplayLevel = (card) => {
        switch (card.rarity?.toLowerCase()) {
            case "legendary": return card.level + 8;
            case "epic": return card.level + 5;
            case "rare": return card.level + 2;
            case "champion": return card.level + 10;
            default: return card.level;
        }
    };

    const formatBattleTime = (crString) => {
        try {
            // Example input: '20250616T191928.000Z'
            const iso = crString.replace(
                /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.000Z$/,
                '$1-$2-$3T$4:$5:$6.000Z'
            );

            const date = new Date(iso);
            if (isNaN(date.getTime())) return "Unknown Time";

            return date.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "Unknown Time";
        }
    };

    return (
        <section className="hero">
            <h2>Command the Arena</h2>
            <p>Master your strategy with powerful cards and unbeatable decks. Build, battle, and rise to the top!</p>

            <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
                <input
                    type="text"
                    placeholder="#YourPlayerTag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={{
                        padding: "0.75rem 1rem",
                        fontSize: "1rem",
                        borderRadius: "999px",
                        border: "1px solid #555",
                        outline: "none",
                        marginRight: "1rem",
                        width: "250px",
                        backgroundColor: "#111",
                        color: "#fff",
                    }}
                />
                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

            {playerData && (
                <div style={{ marginTop: "2rem", backgroundColor: "#222", padding: "1.5rem", borderRadius: "10px", color: "#fff" }}>
                    <h3>{playerData.name} ({playerData.tag})</h3>
                    <p><strong>Level:</strong> {playerData.expLevel}</p>
                    <p><strong>Arena:</strong> {playerData.arena.name}</p>
                    <p><strong>Trophies:</strong> {playerData.trophies} (Best: {playerData.bestTrophies})</p>
                    <p><strong>Wins:</strong> {playerData.wins} | <strong>Losses:</strong> {playerData.losses}</p>
                    <p><strong>Battle Count:</strong> {playerData.battleCount} | <strong>Three Crown Wins:</strong> {playerData.threeCrownWins}</p>
                    <p><strong>Clan:</strong> {playerData.clan ? playerData.clan.name : "No Clan"}</p>
                    <p><strong>Clan Tag:</strong> {playerData.clan ? playerData.clan.tag : "No Clan"}</p>

                    <div style={{ marginTop: "1rem" }}>
                        <button onClick={handleBattleLog} style={{ marginRight: "1rem", padding: "0.5rem 1.25rem", borderRadius: "6px", background: "#facc15", border: "none", fontWeight: "bold" }}>
                            Show Battle Log
                        </button>
                        <button onClick={handleChests} style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", background: "#34d399", border: "none", fontWeight: "bold" }}>
                            Show Upcoming Chests
                        </button>
                    </div>

                    {chests.length > 0 && (
                        <div style={{ marginTop: "1.5rem" }}>
                            <h4 style={{ marginBottom: "0.5rem", color: "#34d399" }}>Upcoming Chests</h4>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {chests.map((chest, i) => (
                                    <li key={i} style={{ marginBottom: "0.5rem" }}>
                                        #{chest.index} → {chest.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {playerData.currentDeck && playerData.currentDeck.length > 0 && (
                        <div style={{ marginTop: "2rem" }}>
                            <h4 style={{ marginBottom: "0.5rem", color: "#facc15" }}>Current Deck</h4>
                            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                {playerData.currentDeck.map((card, index) => (
                                    <div key={index} style={{ textAlign: "center", backgroundColor: "#333", padding: "0.75rem", borderRadius: "8px" }}>
                                        <img src={card.iconUrls.medium} alt={card.name} width="64" height="64" style={{ borderRadius: "0.5rem" }} />
                                        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{card.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: "#aaa" }}>Lvl {getDisplayLevel(card)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {playerData.cards && (
                        <div style={{ marginTop: "2.5rem" }}>
                            <h4 style={{ marginBottom: "0.5rem", color: "#38bdf8" }}>All Cards</h4>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "1rem" }}>
                                {playerData.cards.map((card, index) => (
                                    <div key={index} style={{ backgroundColor: "#333", padding: "0.5rem", borderRadius: "8px", textAlign: "center" }}>
                                        <img src={card.iconUrls.medium} alt={card.name} width="64" height="64" style={{ borderRadius: "6px" }} />
                                        <div style={{ fontSize: "0.75rem", color: "#fff" }}>{card.name}</div>
                                        <div style={{ fontSize: "0.7rem", color: "#aaa" }}>Level {getDisplayLevel(card)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {battleLog.length > 0 && (
                        <div style={{ marginTop: "3rem" }}>
                            <h4 style={{ marginBottom: "0.5rem", color: "#f87171" }}>Recent Battles</h4>
                            {battleLog.map((battle, i) => {
                                const team = battle.team[0];
                                const opponent = battle.opponent[0];
                                const teammate = battle.team[1];
                                const enemyMate = battle.opponent[1];
                                const is2v2 = battle.gameMode?.name === "TeamVsTeam";
                                const teamCrowns = team.crowns;
                                const opponentCrowns = opponent.crowns;
                                const winner = teamCrowns > opponentCrowns ? team.name : teamCrowns < opponentCrowns ? opponent.name : "Draw";

                                return (
                                    <div key={i} style={{ backgroundColor: "#111", marginBottom: "1.5rem", padding: "1rem", borderRadius: "8px" }}>
                                        <div style={{ marginBottom: "0.5rem", color: "#38bdf8" }}>
                                            <strong>Mode:</strong> {battle.gameMode?.name || "Unknown"} | <strong>Arena:</strong> {battle.arena?.name || "Unknown"} | <strong>Type:</strong> {battle.type} | <strong>Time:</strong> {formatBattleTime(battle.battleTime)}
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ flex: 1 }}>
                                                <h5 style={{ color: "#4ade80" }}>{team.name} — 🏆 {teamCrowns}</h5>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                                    {team.cards.map((card, ci) => (
                                                        <div key={ci} style={{ textAlign: "center" }}>
                                                            <img src={card.iconUrls.medium} alt={card.name} width="48" height="48" style={{ borderRadius: "4px" }} />
                                                            <div style={{ fontSize: "0.7rem", color: "#fff" }}>{card.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {is2v2 && teammate && (
                                                    <div style={{ marginTop: "0.75rem", color: "#6ee7b7" }}>
                                                        🫂 Teammate: {teammate.name}
                                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
                                                            {teammate.cards.map((card, ti) => (
                                                                <div key={ti} style={{ textAlign: "center" }}>
                                                                    <img src={card.iconUrls.medium} alt={card.name} width="32" height="32" style={{ borderRadius: "4px" }} />
                                                                    <div style={{ fontSize: "0.6rem", color: "#bbb" }}>{card.name}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ flex: 1, textAlign: "center", color: "#e2e8f0", fontWeight: "bold" }}>
                                                👑 Winner: {winner}
                                            </div>

                                            <div style={{ flex: 1, textAlign: "right" }}>
                                                <h5 style={{ color: "#f87171" }}>{opponent.name} — 🏆 {opponentCrowns}</h5>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "flex-end" }}>
                                                    {opponent.cards.map((card, ci) => (
                                                        <div key={ci} style={{ textAlign: "center" }}>
                                                            <img src={card.iconUrls.medium} alt={card.name} width="48" height="48" style={{ borderRadius: "4px" }} />
                                                            <div style={{ fontSize: "0.7rem", color: "#fff" }}>{card.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {is2v2 && enemyMate && (
                                                    <div style={{ marginTop: "0.75rem", color: "#fca5a5" }}>
                                                        🫂 Enemy Teammate: {enemyMate.name}
                                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem", justifyContent: "flex-end" }}>
                                                            {enemyMate.cards.map((card, ti) => (
                                                                <div key={ti} style={{ textAlign: "center" }}>
                                                                    <img src={card.iconUrls.medium} alt={card.name} width="32" height="32" style={{ borderRadius: "4px" }} />
                                                                    <div style={{ fontSize: "0.6rem", color: "#bbb" }}>{card.name}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
