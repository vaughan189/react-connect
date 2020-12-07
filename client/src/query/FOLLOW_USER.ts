import gql from "graphql-tag";

export const FOLLOW_USER = gql`
mutation follow($authorId: String!, $followerId: String!) {
    follow(authorId: $authorId, followerId: $followerId) {
      authorId
      followerId
    }
}`