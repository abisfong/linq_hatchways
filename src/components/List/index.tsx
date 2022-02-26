import React, { FC } from 'react';
import list-item from '../ListItem';
import './list.scss';

const list: FC = () => {
  const list = [1,2,3,4,5];
  
  return (
    <div className='list'>
      
      <ul>
        {
          list.map(num => {
            return (
              <list-item key={num}/>
            )
          })
        }
      </ul>
    </div>
  );
}

export default list;