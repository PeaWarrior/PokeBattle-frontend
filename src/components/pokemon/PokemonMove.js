import React from 'react';

export default function PokemonMove(move) {
    const { name, accuracy, types, power, priority, text, damage } = move;
    
    return (
        <div className="d-flex flex-wrap text-center pokemonMove">
            <small className="moveFont">

            {name}
            </small>
        </div>
    )
};