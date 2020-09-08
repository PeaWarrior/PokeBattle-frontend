import React from 'react';
import { useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import AddPokemonForm from './AddPokemonForm';
import PokemonTypes from './pokemon/PokemonTypes'
import useFormatPokemonId from '../utility/useFormatPokemonId';

export default function PokemonCard(pokemon) {
    const location = useLocation();
    const { team_id, team_name } = location.state;
    const { id, species, types, sprites} = pokemon;

    return (
        <div className='pokemonCard'>
            <img src={sprites.front} alt={species} />
            <small>{useFormatPokemonId(id)}</small>
            <h6 className="text-capitalize">{species}</h6>
            
            <PokemonTypes {...types} />
            <br/>
            <AddPokemonForm team_id={team_id} team_name={team_name} {...pokemon}/>
            
        </div>
    )
}