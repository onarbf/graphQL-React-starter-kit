import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import {ApolloProvider} from 'react-apollo';

import './styles/index.scss'

import client from './utils/apollo';

const App = ()=>(
  <ApolloProvider client={client}>
    <Routes/>
  </ApolloProvider>
)

ReactDOM.render(<App/>,document.getElementById('app'));
