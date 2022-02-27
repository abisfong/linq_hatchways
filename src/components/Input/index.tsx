import { FC, ChangeEventHandler, FormEventHandler } from 'react';
import './Input.scss';

const Input: FC<{ 
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement> | undefined,
  onSubmit: FormEventHandler<HTMLInputElement> | undefined;
}> = ({ placeholder, onChange, onSubmit }) => {
  return <input 
    className='input' 
    type="text" 
    placeholder={ placeholder }
    onChange={ onChange }
    onSubmit={ onSubmit }
  />
}

export default Input;