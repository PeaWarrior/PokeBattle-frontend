import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard'
import { Container, Button, Badge } from 'react-bootstrap';

export default function Team(team) {
    const { name, matches, wins, losses, team_pokemons } = team
    // const [name, setName] = useState(team.name);
    // const [matches, setMatches] = useState(team.matches);
    // const [wins, setWins] = useState(team.wins);
    // const [losses, setLosses] = useState(team.losses);
    // const [teamPokemons, setTeamPokemons] = useState(team.team_pokemons);
    console.log(team_pokemons)

    // useEffect(() => {
    //     if (team) {
    //         setName(team.name);
    //         setMatches(team.matches);
    //         setWins(team.wins);
    //         setLosses(team.losses);
    //         setTeamPokemons(team.team_pokemons);
    //     }
    // }, [team])

    function renderTeamPokemons() {
        if (team_pokemons) {
            return team_pokemons.map(teamPokemon => {
                const { nickname, shiny, pokemon } = teamPokemon
                return (
                    <PokemonCard key={teamPokemon.id} {...teamPokemon} />
                )
            })
        }
    }
    return (
        <Container>
            <h1>{name}</h1>
            <Button>Wins: <Badge>{wins}</Badge></Button>
            <Button>Losses: <Badge>{losses}</Badge></Button>
            <Button>Matches: <Badge>{matches}</Badge></Button>
            {renderTeamPokemons()}
        </Container>
    )
}