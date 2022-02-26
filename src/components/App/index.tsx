import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
// import Test from '../Test';
import Deck from '../Deck';
import './App.scss';

function App() {
  // const [randDogPic, setRandDogPic] = useState('');

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Deck/>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
