import { FC, ChangeEventHandler } from 'react';
import Trie from '../../classes/Trie';
import './Search.scss';

const Search: FC<{ 
  trie: Trie, 
  onChange: ChangeEventHandler<HTMLInputElement> 
}> = ({ trie, onChange }) => {
  return <input 
    className='search' 
    type="text" 
    placeholder='Search by name'
    onChange={ onChange }
  />
}

export default Search;