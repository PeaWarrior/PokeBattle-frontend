import React, { useState, useEffect } from 'react';
import useFormatPokemonId from '../utility/useFormatPokemonId';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import PokemonStats from './pokemon/PokemonStats';
import PokemonImage from './pokemon/PokemonImage';
import PokemonMove from './pokemon/PokemonMove';
import PokemonTypes from './pokemon/PokemonTypes';

export default function PokemonTeamCard(props) {
    const { nickname, shiny, moves, pokemon} = props
    console.log(moves.types)

    const renderMoves = () => {
        return moves.map(move => <PokemonMove {...move} />)
    }


    return (
        <Container className="pokemonCard">
            <Row>
                <Col md={4} className="p-0">
                    {/* <img src={pokemon.sprites.front} alt={pokemon.species} /> */}
                    <PokemonImage shiny={shiny} {...pokemon.sprites} />
                    <PokemonTypes {...pokemon.types} />
                </Col>
                <Col className="p-0">
                    <h5 className="pokemonNickname">{nickname ? nickname : pokemon.species}</h5>
                    <hr className="divider"/>
                    <PokemonStats {...pokemon.stats} />
                </Col>
            </Row>
            <hr className="divider"/>
            <Row className="d-flex flex-wrap justify-content-around">
                {renderMoves()}
            </Row>
        </Container>
    )
}

PokemonTeamCard.defaultProps = {
    moves: []
}