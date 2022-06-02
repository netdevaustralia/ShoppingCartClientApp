
import ReactDOM from 'react-dom/client';
import React from "react";
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <App />,
    </BrowserRouter>,
  </QueryClientProvider>
);


