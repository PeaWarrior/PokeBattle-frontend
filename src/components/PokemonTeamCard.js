import React, { useState, useEffect } from 'react';
import useFormatPokemonId from '../utility/useFormatPokemonId';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import PokemonStats from './pokemon/PokemonStats';
import PokemonImage from './pokemon/PokemonImage'

export default function PokemonTeamCard(props) {
    const { nickname, shiny, moves, pokemon} = props
    // const pokemonId = useFormatPokemonId(pokemon.id)

    console.log(props)

    return (
        <Container className="mb-3 pokemonCard" >
            <Row>
                <Col md="2" className="p-0">
                <PokemonImage shiny={shiny} {...pokemon.sprites}/>
                </Col>
                <Col md="6" className="p-0">
                    <Card.Body className="pl-0 pt-0 pb-0">
                        <PokemonStats {...pokemon.stats} />
                    </Card.Body>
                </Col>
                <Col>
                    <ListGroup>
                        <div className="pokemonMove"></div>
                        <div className="pokemonMove"> </div>
                        <div className="pokemonMove">Growl</div>
                        <div className="pokemonMove">Tackle</div>
                    </ListGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card.Header>{nickname || pokemon.species}</Card.Header>
                </Col>

            </Row>
       </Container>
    )
}