import express from "express";
import Sequelize from "sequelize";
import { ApolloServer, subConnect, subDisconnect } from "apollo-server-express";
const { PubSub } = require('apollo-server-express');
import typeDefs from "./graphql/schema/schema";
import resolvers from "./graphql";
import db from "./models";
import { createServer } from 'http';
const Op = Sequelize.Op;
const pubsub = new PubSub();
const server = new ApolloServer({ typeDefs, resolvers, context: { db, Op, pubsub }, subscriptions: {
    onConnect: subConnect,
    onDisconnect: subDisconnect,
}});

const app = express();
server.applyMiddleware({ app });
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/', express.static(__dirname + '/public'));

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({port: process.env.PORT}, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
});