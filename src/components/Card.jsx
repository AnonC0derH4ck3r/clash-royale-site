import React from "react";

export default function Card({ name, type, img }) {
    return (
        <div className="card">
            <img src={img} alt={name} />
            <h4>{name}</h4>
            <span>{type}</span>
        </div>
    );
}