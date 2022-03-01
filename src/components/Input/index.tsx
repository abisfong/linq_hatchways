import { FC, ChangeEventHandler, KeyboardEventHandler } from 'react';
import './Input.scss';

const Input: FC<{ 
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement> | undefined,
  onKeyDown: KeyboardEventHandler<HTMLInputElement> | undefined,
}> = ({ placeholder, onChange, onKeyDown }) => {
  return <input 
    className='input' 
    type="text" 
    placeholder={ placeholder }
    onChange={ onChange }
    onKeyDown={ onKeyDown }
  />
}

export default Input;