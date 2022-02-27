import { useState, FC } from 'react';
import './Search.scss';

const Search: FC = () => {
  return <input 
    className='search' 
    type="text" 
    placeholder='Search by name'
  />
}

export default Search;