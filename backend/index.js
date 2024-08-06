import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

import passport from "passport";
import session from "express-session";
import ConnectMongo from "connect-mongodb-session";

import { buildContext } from "graphql-passport";

import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js"; // Importing the connectDb function from the db/connectDb.js file
import { configurePassport } from "./passport/passport.config.js"; // Importing the passport configuration

import mergedResolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";

dotenv.config();
const app = express();

await configurePassport(); // Configuring passport

const httpServer = http.createServer(app);

const MongoDbStore = ConnectMongo(session);

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: store, // store the session in the MongoDB database
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true, // The cookie only accessible by the web server and prevents xss attacks
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

await connectDb(); // Connecting to the database

app.use(
  "/",
  cors(
    {
      origin: "http://localhost:3000",
      credentials: true,
    },
    app
  ),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000`);
