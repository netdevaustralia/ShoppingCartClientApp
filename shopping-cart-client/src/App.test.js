import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
const client = new QueryClient();

it('renders without crashing', () => {
  render( <QueryClientProvider client={client}>
    <BrowserRouter>
      <App />,
    </BrowserRouter>,
    {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
  </QueryClientProvider>);
});