import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import List from '../List';
import './App.scss';

function App() {

  return (
    <QueryClientProvider client={new QueryClient()}>
      <List/>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
