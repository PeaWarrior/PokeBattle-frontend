import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PokemonStats from './pokemon/PokemonStats';
import PokemonImage from './pokemon/PokemonImage';
import PokemonMove from './pokemon/PokemonMove';
import PokemonTypes from './pokemon/PokemonTypes';

const URL = 'http://localhost:3001/'

export default function PokemonTeamCard(props) {
    const { id, nickname, shiny, moves, pokemon, handleReleasePokemon } = props;
    const [showOptions, setShowOptions] = useState(false);

    const renderMoves = () => {
        return moves.map(move => <PokemonMove key={move.name} {...move} />);
    };
    
    const handleClickShowOptions = (event) => {
        setShowOptions(!showOptions);
    };
    
    const renderOptionsClose = () => {
        return (
            <i onClick={handleClickShowOptions} className={`fas ${showOptions ? "fa-times-circle" : "fas fa-edit"} option`}/>
        );
    };

    const handleClickRelease = () => {
        const response = window.confirm(`Are you sure you want to release ${nickname} back into the wild?`)
        if (response) {
            handleReleasePokemon(id);
        }
    }

    return (
        <Container className="pokemonCard">
                
                <Row>
                    <Col md={4} className="pr-0">
                        <PokemonImage shiny={shiny} view={showOptions} species={pokemon.species} {...pokemon.sprites} />
                        <PokemonTypes {...pokemon.types} />
                    </Col>
                    <Col md={8} className="pl-0">
                        <div className="d-flex justify-content-between">
                            <h5 className="pokemonNickname">{nickname ? nickname : pokemon.species}</h5>
                            {nickname ? renderOptionsClose() : null }
                        </div>
                        <hr className="divider"/>
                        {showOptions ? 
                        <Container className="text-center p-4">
                            <Button onClick={handleClickRelease} variant='outline-danger'>Release</Button>
                        </Container>
                        :
                        <PokemonStats {...pokemon.stats} /> }
                        
                    </Col>
                </Row>
                <hr className="divider"/>
                <Row className="pl-3 pr-3 pt-2 d-flex flex-wrap justify-content-between">
                    {renderMoves()}
                </Row>
                
        </Container>
    )
}

PokemonTeamCard.defaultProps = {
    moves: []
}