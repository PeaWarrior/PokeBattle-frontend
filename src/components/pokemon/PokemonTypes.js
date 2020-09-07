import React from 'react';

export default function PokemonTypes(types) {

    return (
        <div className="d-flex">
            <small className={`badge ${types[0]}`}>{types[0]}</small>
            <small className={`badge ${types[1]}`}>{types[1]}</small>
        </div>
    )
    
}