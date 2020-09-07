import React from 'react';

export default function PokemonImage(pokemonSprites) {
    const { shiny, front, front_shiny } = pokemonSprites

    return (
        <img src={shiny ? front_shiny : front} alt='' />
    )
}