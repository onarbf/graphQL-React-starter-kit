import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import auth from './utils/auth';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

// The GraphQL schemas.
import schemas from './schemas';
// The resolvers
import resolvers from './resolvers';
// The models for the Database
import models from './models';

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs : schemas,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors({
  origin:["http://localhost:3001"]
}))
app.use(auth.checkAuth);

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress((req)=>{
  return {
    schema,
    context : {
      models,
      user: req.user
    }
  }
}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

//Connect to the Database
mongoose.connect('mongodb://localhost:27017/graphql_react_app_from_scracth',()=>{
  console.log('Connected to localhost database via Mongoose...')
});
// Start the server
app.listen(3000, () => {
  console.log('GRAPHQL SERVER Running on port 3000... ');
});
