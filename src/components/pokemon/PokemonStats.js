import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function PokemonStats(pokemonStats) {
    const { hp, attack, defense, spAttack, spDefense, speed } = pokemonStats

    return (
        <Container className="p-0">
            
            <Row>
                <Col xs={3}><small>Hp: </small></Col>
                <Col xs={3}><small>{hp}</small></Col>
                <Col xs={3}><small>Spd:</small></Col>
                <Col xs={3}><small>{speed}</small></Col>
            </Row>
            <Row>
                <Col xs={3}><small>Atk:</small></Col>
                <Col xs={3}><small>{attack}</small></Col>
                <Col xs={3}><small>Def:</small></Col>
                <Col xs={3}><small>{defense}</small></Col>
            </Row>
            <Row>
                <Col xs={3}><small>spAtk:</small></Col>
                <Col xs={3}><small>{spAttack}</small></Col>
                <Col xs={3}><small>spDef:</small></Col>
                <Col xs={3}><small>{spDefense}</small></Col>
            </Row>
        </Container>
    )
}