import React from 'react';
import { Card } from 'react-bootstrap'

export default function PokemonCard(props) {
    const { nickname, shiny, moves, pokemon} = props
    console.log(pokemon)

    return (
       <Card>
           <Card.Img variant="bottom" src={shiny ? pokemon.sprites.shiny_front : pokemon.sprites.front} />
           <Card.Body>
                <Card.Title>{nickname}</Card.Title>
                <Card.Text>
                    {pokemon.species}
                    {pokemon.id}
                </Card.Text>
           </Card.Body>
       </Card>
    )
}