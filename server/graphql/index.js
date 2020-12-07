const { Query, Author, Follower, Following, Like, Post, Comment} = require('./queries');
const { Mutation } = require('./mutations');
const { Subscription } = require('./subscriptions/index')

module.exports = {
    Query,
    Mutation,
    Author,
    Follower,
    Following,
    Like,
    Post,
    Comment,
    Subscription
}