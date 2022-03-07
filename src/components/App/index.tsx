import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import List from '../List';
import './App.scss';

function App() {

  return (
    <QueryClientProvider client={new QueryClient()}>
      <List/>
    </QueryClientProvider>
  );
}

export default App;
