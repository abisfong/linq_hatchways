import { useState, FC } from 'react';
import IStudent from '../../interfaces/IStudent';
import Trie from '../../utils/Trie';
import './Search.scss';

const Search: FC<{ trie: Trie }> = ({ trie }) => {
  return <input 
    className='search' 
    type="text" 
    placeholder='Search by name'
  />
}

export default Search;