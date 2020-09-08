import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PokemonCard from './PokemonCard'

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons();
    }, [])
    
    const fetchPokemons = () => {
        fetch('http://localhost:3001/pokemons')
        .then(resp => resp.json())
        .then(data => setPokemons(data))
    }

    const renderPokemonCards = () => {
        return pokemons.map(pokemon => 
            <Col key={pokemon.id} md={2}>
                <PokemonCard 
                    key={pokemon.id} 
                    {...pokemon}
                />
            </Col>
            )
    }
    
    return (
        <Container className='mt-5'>
            <Row className='mb-4'>
                {renderPokemonCards()}
            </Row>
        </Container>
    )
}