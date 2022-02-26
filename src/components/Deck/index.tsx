import React, { FC } from 'react';
import Card from '../Card';
import './Deck.scss';

const Deck: FC = () => {
  const deck = [1,2,3,4,5];
  
  return (
    <div className='deck'>
      
      <ul>
        {
          deck.map(num => {
            return (
              <Card key={num}/>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Deck;