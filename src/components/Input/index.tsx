import { FC, ChangeEventHandler } from 'react';
import './Input.scss';

const Input: FC<{ 
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement> 
}> = ({ placeholder, onChange }) => {
  return <input 
    className='input' 
    type="text" 
    placeholder={ placeholder }
    onChange={ onChange }
  />
}

export default Input;