import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import PokemonTeamCard from './PokemonTeamCard';
import { useHistory } from "react-router-dom";

export default function TeamCard(team) {
    const { id, name, matches, wins, losses, team_pokemons } = team;
    const [teamPokemons, setTeamPokemons] = useState(team_pokemons);
    
    const history = useHistory();

    const getWinRate = () => {
        if (matches) {
            return `${wins/matches}%`
        } else {
            return 'N/A'
        }
    };

    const renderTeamPokemons = () => {
        if (teamPokemons) {
            return teamPokemons.map(teamPokemon => (
                <Col  md={4}>
                    <PokemonTeamCard {...teamPokemon} />
                </Col>
            ))
        }
    };

    const handleEditClick = (event) => {
        history.push({
            pathname: '/team',
            state: {...team}
        })
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={10}>
                    <h1>{name}</h1>
                </Col>
                <Col md={2}>
                    <Button onClick={handleEditClick}>Edit team</Button>
                </Col>
            </Row>
            <Row>
                <Badge>Total Matches: {matches}</Badge>
                <Badge>Winrate: {getWinRate()}</Badge>
                <br/>
                <Badge>Wins: {wins}</Badge>
                <Badge>Losses: {losses}</Badge>
                <hr/>
            </Row>
            <Row>
                {renderTeamPokemons()}
            </Row>
        </Container>
    )
}