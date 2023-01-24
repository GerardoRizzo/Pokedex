import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {

    const { id } = useParams();

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemon(res.data))
            .catch(() => alert("Ese pokemon no existe"))
    }, [])

    console.log(pokemon)

    return (
        <div>
            <div>
                <h2>{pokemon.name}</h2>
                <h3><b>#</b> {id}</h3>
                <img src={pokemon.sprites?.front_default} alt="" />
                <p><b>Height:</b>{pokemon.height}  <b>Weight:</b>{pokemon.weight}</p>
            </div>
            <div>
                <h3>Types</h3>
                <p>{pokemon.types?.[0]?.type.name} {pokemon.types?.[1]?.type.name}</p>
            </div>
            <div>
                <h3>Abilities</h3>
                <p>{pokemon.abilities?.[0]?.ability.name} {pokemon.abilities?.[1]?.ability.name}</p>
            </div>
        </div>
    );
};

export default PokemonDetail;