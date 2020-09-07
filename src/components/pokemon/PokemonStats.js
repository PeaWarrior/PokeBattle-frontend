import React from 'react';
import { Row, Container } from 'react-bootstrap';

export default function PokemonStats(pokemonStats) {
    const { hp, attack, defense, spAttack, spDefense, speed } = pokemonStats

    return (
        <Container className="p-0 d-flex flex-wrap">
                <small className="stat">Hp: </small>
                <small className="stat">{hp}</small>
                <small className="stat">Spd:</small>
                <small className="stat">{speed}</small>
                <small className="stat">Atk:</small>
                <small className="stat">{attack}</small>
                <small className="stat">Def:</small>
                <small className="stat">{defense}</small>
                <small className="stat">sp.Atk:</small>
                <small className="stat">{spAttack}</small>
                <small className="stat">sp.Def:</small>
                <small className="stat">{spDefense}</small>
        </Container>
    )
}