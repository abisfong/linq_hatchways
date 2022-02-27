import { FC, ChangeEventHandler } from 'react';
import './Search.scss';

const Search: FC<{ 
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement> 
}> = ({ placeholder, onChange }) => {
  return <input 
    className='search' 
    type="text" 
    placeholder={ placeholder }
    onChange={ onChange }
  />
}

export default Search;