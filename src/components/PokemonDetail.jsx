import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {

    const { id } = useParams();

    const [pokemon , setPokemon] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemon(res.data))
            .catch(() => alert("Ese pokemon no existe"))
    },[])

    console.log(pokemon)

    return (
        <div>
            <h1>Pokemon Detallado</h1>
            <h3>{id}</h3>
            <img src={pokemon.sprites?.front_default} alt="" />
        </div>
    );
};

export default PokemonDetail;