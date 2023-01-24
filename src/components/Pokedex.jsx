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

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=300')
            .then(res => setPokemons(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypes(res.data.results))
    }, [])

    const search = () => {
        navigate(`/pokemon/${inputSearch}`)
    }

    const filterType = (e) => {
        axios.get(e.target.value)
            .then(res => setPokemons(res.data.pokemon))
    }

    console.log(pokemons)

    const [page, setPage] = useState(1);
    const pokemonPerPage = 30;
    const lastIndex = page * pokemonPerPage;
    const firstIndex = lastIndex - pokemonPerPage;
    const pokemonPaginated = pokemons.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(pokemons.length / pokemonPerPage)

    const pages = []
    for(let i = 1; i <= totalPage; i++){
        pages.push(i)
    }

    return (
        <div>
            <h1 className='title'>Pokedex</h1>
            <p>Welcome, {userName}</p>
            <div>
                <input type="text"
                    placeholder='Search for Pokemon'
                    value={inputSearch}
                    onChange={e => setInputSearch(e.target.value)}
                />
                <button onClick={search}>Search</button>
            </div>
            <div>
                <select onChange={filterType} name="" id="">
                    {types.map((type) => (
                        <option value={type.url} key={type.url}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <ul className='pokemon-list'>
                    {pokemonPaginated?.map(pokemon => (
                        <PokemonCard
                            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <p>You are in page {page} of {totalPage}</p> 
                <br />
                <button onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                >
                    Prev Page
                </button>
                {pages.map(number =>
                <button onClick={() => setPage(number)}>{number}</button>
                    )}
                <button onClick={() => setPage(page + 1)}
                        disabled={page === totalPage}
                >
                    Next Page</button>
            </div>
        </div>
    );
};

export default Pokedex;