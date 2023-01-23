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
          </div>
        </li>
    );
};

export default PokemonCard;