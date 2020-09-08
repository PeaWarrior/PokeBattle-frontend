import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPokemons();
    }, []);
    
    const fetchPokemons = () => {
        fetch('http://localhost:3001/pokemons')
        .then(resp => resp.json())
        .then(data => setPokemons(data))
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const filterPokemon = () => {

        return pokemons.filter((pokemon) => {
            if (pokemon.species.includes(search) || pokemon.id.toString().includes(search) || pokemon.types.includes(search)) {
                return true
            } else {
                return false
            }
        });
    };

    const renderPokemonCards = () => {
        return filterPokemon().map(pokemon => 
            <Col key={pokemon.id} md={3}>
                <PokemonCard 
                    key={pokemon.id} 
                    {...pokemon}
                />
            </Col>
            )
    };
    
    return (
        <Container className='mt-5'>
            <Row>
                <SearchBar handleChangeSearch={handleChangeSearch} search={search} />
            </Row>
            <br/>
            <Row className='mb-4'>
                {renderPokemonCards()}
            </Row>
        </Container>
    )
}