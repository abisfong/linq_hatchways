import React, { useState, FC } from 'react';
import { useQuery } from 'react-query';
import IStudent from '../../interfaces/IStudent';
import { fetchStudents } from '../../utils/studentApi';
import { randomNumber } from '../../utils';
import './ListItem.scss';

const ListItem: FC = () => {
  const [pokemon, setPokemon] = useState<IStudent | undefined>()
  const pokemonCount = 1126;
  const pokemonId = pokemon ? pokemon.id : randomNumber(1, pokemonCount);
  const useQueryOptions = {
    refetchOnWindowFocus: false,
    onSuccess: (data: IStudent) => setPokemon(data)
  };
  const { isLoading } = useQuery<IStudent, Error>(
    `${pokemonId}`, 
    fetchStudents(pokemonId), 
    useQueryOptions
  );

  if (isLoading)
    return <div>Loading...</div>
  
  return (
    <li className='list-item'>
    </li>
  )
}

export default ListItem;