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
const PORT = process.env.PORT || 3000;
const DDBB_PORT = process.env.DDBB_PORT || 27017;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors({
  origin:[`htp://${HOST}:${PORT}`]
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
mongoose.connect(`mongodb://${HOST}:${DDBB_PORT}/graphql_react_app_from_scracth`,()=>{
  console.log('Connected to localhost database via Mongoose...')
});
// Start the server
app.listen(PORT, () => {
  console.log(`GRAPHQL SERVER Running on port ${PORT}... `);
});
