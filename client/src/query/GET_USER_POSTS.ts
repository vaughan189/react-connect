import gql from 'graphql-tag';

export const GET_USER_POSTS = gql`query getAuthor($id: ID!) {
    author(id: $id) {
      id
      firstName
      lastName
      email
      posts {
        id
        title
        content
      }
      follower {
      authorId
      followerId
        author {
          firstName
          lastName
          email
        }
      }
    following {
      authorId
      followerId
      author {
          firstName
          lastName
          email
        }
      }
    }
  }`