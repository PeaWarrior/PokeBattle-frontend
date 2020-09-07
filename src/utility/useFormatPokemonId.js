import { useState, useEffect } from 'react';

export default function useFormatPokemonId(id) {

    const [pokemonId, setPokemonId] = useState(null);

    useEffect(() => {
        const pokemonIdLength = id.toString().length;
        switch (pokemonIdLength) {
            case 1:
                setPokemonId(`#00${id}`);
                break;
            case 2:
                setPokemonId(`#0${id}`);
                break;
            case 3:
                setPokemonId(`#${id}`);
                break;
            default:
                break;
        }
    }, [id]);
    return pokemonId;
    
}