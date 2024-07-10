import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';
import './firebaseConfig.js';
import { getAuth } from 'firebase-admin/auth';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const app = express();

const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ]
})


await server.start();

// middleware
const AuthorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.slice(7);

    getAuth().verifyIdToken(accessToken)
      .then(decodedToken => {
        // console.log(decodedToken);
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch(err => {
        console.log(err);
        return res.status(403).json({ message: 'Forbiden', error: err });
      })

  } else {
    // return res.status(401).json({ message: 'Unauthorized' })
    next();
  }
}

app.use(cors(), AuthorizationJWT, bodyParser.json(), expressMiddleware(server, {
  context: async ({ req, res }) => {
    return { uid: res.locals.uid }
  }
}));

// connect DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {

  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.log('starting....')
})


