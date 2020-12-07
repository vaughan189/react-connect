import gql from 'graphql-tag';

export const GET_FOLLOWINGS = gql` 
query getFollowingList($authorId: ID!) {
  following(authorId: $authorId) {
    id
    authorId
    followerId
    author {
      firstName
      lastName
    }
  }
}`;