import React from "react";
import Card from "./Card";

const cards = [
    { name: "Knight", type: "Troop", img: "https://royaleapi.github.io/cr-api-assets/cards/knight.png" },
    { name: "Fireball", type: "Spell", img: "https://royaleapi.github.io/cr-api-assets/cards/fireball.png" },
    { name: "Cannon", type: "Building", img: "https://royaleapi.github.io/cr-api-assets/cards/cannon.png" },
];

export default function CardGrid() {
    return (
        <section className="card-grid">
            <h3>Top Cards</h3>
            <div className="card-grid-inner">
                {cards.map((card, i) => (
                    <Card key={i} {...card} />
                ))}
            </div>
        </section>
    );
}