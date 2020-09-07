import React from 'react';

export default function PokemonStats(pokemonStats) {
    const { hp, attack, defense, spAttack, spDefense, speed } = pokemonStats

    return (
        <div>
            <p>Hp: {hp}</p>
            <p>Attack: {attack}</p>
            <p>sp. Attack: {spAttack}</p>
            <p>Defense: {defense}</p>
            <p>sp. Defense: {spDefense}</p>
            <p>Speed: {speed}</p>
        </div>
    )
}