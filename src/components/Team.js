import React from 'react';
import PokemonTeamCard from './PokemonTeamCard';
import { Container, Badge, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';

const URL = 'http://localhost:3001/'

export default function Team() {
    const location = useLocation();
    const history = useHistory();
    const { id, name, matches, wins, losses, team_pokemons } = location.state

    const handleClickAddPokemonToTeam = (event) => {
        history.push({
            pathname: '/pokedex',
            state: {
                team_id: id,
            }
        })
    }

    const renderAddPokemonButton = () => {
        if (team_pokemons.length < 3) {
            return <button onClick={handleClickAddPokemonToTeam}>Add Pokemon</button>
        }
    }

    const renderTeamPokemons = () => {
        if (team_pokemons) {
            return team_pokemons.map(teamPokemon => (
                <Row>
                    <PokemonTeamCard key={teamPokemon.id} {...teamPokemon} />
                </Row>
            ))
        }
    };

    const handleClick = (event) => {
        const confirmation = window.confirm('You sure you want to delete this team?');
        if (confirmation) {
            deleteTeam();
        } else {
            return
        }
    };

    const deleteTeam = () => {
        fetch(`${URL}teams/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            history.push('/teams')
        })
    }

    return (
        <Container>
            <Row>
                <Col md="10">
                    <h1>{name}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Badge>Total Matches: {matches}</Badge>
                    <Badge>Winrate: { matches ? `${wins/matches}%` : 'N/A' }</Badge>
                    <br/>
                    <Badge>Wins: {wins}</Badge>
                    <Badge>Losses: {losses}</Badge>
                </Col>
                <Col md="2" className="text-right">
                    <Button
                        onClick={handleClick}
                        variant="danger">
                        Delete Team
                    </Button>
                </Col>
            </Row>
            <hr/>
            {renderAddPokemonButton()}
            {renderTeamPokemons()}
        </Container>
    )
}