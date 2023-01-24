import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({url}) => {

    const [pokemon, setPokemon] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
    },[])

    // console.log(pokemon)

    return (
        <li className="col">
          <div className='pokemon-card' onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
             <h3>{pokemon.name}</h3>
             <img src={pokemon.sprites?.front_default} alt="" />
             <ul>
                <li>{pokemon.stats?.[0].stat.name} {pokemon.stats?.[0].base_stat}</li>
                <li>{pokemon.stats?.[1].stat.name} {pokemon.stats?.[1].base_stat}</li>
                <li>{pokemon.stats?.[2].stat.name} {pokemon.stats?.[2].base_stat}</li>
                <li>{pokemon.stats?.[5].stat.name} {pokemon.stats?.[5].base_stat}</li>
             </ul>
          </div>
        </li>
    );
};

export default PokemonCard;