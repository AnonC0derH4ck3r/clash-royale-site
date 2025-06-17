import React from "react";
import { Swords } from "lucide-react";

export default function Navbar() {
    return (
        <nav>
            <h1><Swords size={24} /> RoyaleDeck</h1>
            <ul>
                <li>Home</li>
                <li>Cards</li>
                <li>Decks</li>
                <li>About</li>
            </ul>
        </nav>
    );
}