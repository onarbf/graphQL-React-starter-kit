import {ApolloClient} from 'apollo-boost';
import {HttpLink} from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  // headers: {"x-token": localStorage.getItem('x-token') || null}
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "Access-Control-Expose-Headers": "x-token" ,
      "x-token": localStorage.getItem('x-token') || null
    },
    err : 'human error'
  })

  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    if (headers) {
      const token = headers.get("x-token");
      if (token) {
        localStorage.setItem("x-token", token);
      }

    }
    return response;
  });
});

export default new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache()
})
