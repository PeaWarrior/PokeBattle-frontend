import React from 'react';

export default function PokemonMove(move) {
    const { name, accuracy, types, power, priority, text, damage } = move;

    const handleClick = () => {

    };
    
    return (
        <small className={`moveFont pokemonMove ${types}`}>{name}</small>
    )
};