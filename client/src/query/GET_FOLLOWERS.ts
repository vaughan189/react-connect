import gql from 'graphql-tag';

export const GET_FOLLOWERS = gql`
query getFollowersList($authorId: ID!) {
  follower(authorId: $authorId) {
    id
    authorId
    followerId
    author {
        firstName
        lastName
    }
  }
}`;