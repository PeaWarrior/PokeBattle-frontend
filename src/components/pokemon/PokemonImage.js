import React from 'react';

export default function PokemonImage(pokemonSprites) {
    const { shiny, front, front_shiny, back, back_shiny, species, view } = pokemonSprites

    return (
        view ? 
        <img src={shiny ? back_shiny : back} alt={species} />
        :
        <img src={shiny ? front_shiny : front} alt={species} />
    )
}