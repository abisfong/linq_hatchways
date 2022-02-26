import React, { useState, FC } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import IPokemon from '../../interfaces/IPokemon';
import { fetchStudents } from '../../utils/studentApi';
import { randomNumber } from '../../utils';
import './Card.scss';

const Card: FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon | undefined>()
  const pokemonCount = 1126;
  const pokemonId = pokemon ? pokemon.id : randomNumber(1, pokemonCount);
  const useQueryOptions = {
    refetchOnWindowFocus: false,
    onSuccess: (data: IPokemon) => setPokemon(data)
  };
  const { isLoading } = useQuery<IPokemon, Error>(
    `${pokemonId}`, 
    fetchStudents(pokemonId), 
    useQueryOptions
  );

  if (isLoading)
    return <div>Loading...</div>
  
  return (
    <li className='card'>
      <h1 className='name'>
        { pokemon?.name }
      </h1>
      <div className='image'>
      </div>
      <ul className='stats'>
        <li>{ pokemon?.base_experience }</li>
        <li>{ pokemon?.height }</li>
        <li>{ pokemon?.weight }</li>
      </ul>
    </li>
  )
}

export default Card;