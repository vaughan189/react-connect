const { author, authors, Author } = require('./Author');
const { follower, following, Follower, Following } = require('./Follow');
const { likes, Like } = require('./Like');
const { post, posts, Post } = require('./Post');
const { Comment } = require('./Comment');

const Query = { 
  author, authors, follower, following, likes, post, posts
}

module.exports = {
  Query, Author, Follower, Following, Like, Post, Comment
};