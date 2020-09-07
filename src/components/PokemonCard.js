import React from 'react';
import useFormatPokemonId from '../utility/useFormatPokemonId';
import { useHistory, useLocation } from 'react-router-dom';
import AddPokemonForm from './AddPokemonForm';
import { Row } from 'react-bootstrap';

export default function PokemonCard(pokemon) {
    const history = useHistory();
    const location = useLocation();
    const { team_id } = location.state;
    const { id, species, types, stats, sprites, moves } = pokemon

    const renderMoves = () => {
        // if (showFull) {
        //     return moves.map(move => <li>{move.name}</li>)
        // }
    }

    const renderTypes = () => {
        return types.map(type => <span>{type}</span>)
    }
    
    const handleClick = (event) => {
        history.push({
            pathname: '/addpokemon',
            state: {
                ...pokemon
            }
        })
    };

    const handleClickAddPokemonToTeam = (event) => {
        fetch('http://localhost:3001/addpokemon', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_pokemon: {
                    
                    team_id: team_id,
                    pokemon_id: id
                }
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return (
        <div className='pokemonCard'>
            <Row>
                <img src={sprites.front} alt={species} />
            </Row>
            <Row>

            </Row>
            <small>{useFormatPokemonId(id)}</small>
            <h1>{species}</h1>
            {renderTypes()}
            <AddPokemonForm team_id={team_id} {...pokemon}/>
            {/* <button onClick={handleClickAddPokemonToTeam}>Add to Team</button>
            <button onClick={handleClick}>View</button> */}
            <ul>
                {/* {renderMoves} */}
            </ul>
        </div>
    )
}