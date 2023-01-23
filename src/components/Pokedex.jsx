import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const Pokedex = () => {

    const userName = useSelector(state => state.userName)
    
    const [pokemons, setPokemons] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [types, setTypes] = useState([]);

    const navigate = useNavigate ();

    useEffect(() => {
       axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then(res => setPokemons(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypes(res.data.results))
    },[])

    const search = () => {
        navigate(`/pokemon/${inputSearch}`)
    }

    const filterType = (e) => {
        axios.get(e.target.value)
            .then(res => setPokemons(res.data.pokemon))
    }

    console.log(pokemons)

    return (
        <div>
            <h1>Pokedex</h1>
            <p>Bienvenido {userName}</p>
            <div>
                <input  type="text" 
                        placeholder='Buscar Pokemon'
                        value={inputSearch}
                        onChange={e => setInputSearch(e.target.value)}
                 />
                <button onClick={search}>Buscar</button>
            </div>
            <div>
                <select onChange={filterType} name="" id="">
                    {types.map((type) =>(
                        <option value={type.url} key={type.url}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <ul className='pokemon-list'>
                    {pokemons?.map (pokemon => (
                        <PokemonCard 
                        url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pokedex;