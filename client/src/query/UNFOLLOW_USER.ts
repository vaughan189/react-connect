import gql from "graphql-tag";

export const UNFOLLOW_USER = gql`
mutation unFollow($authorId: String!, $followerId: String!) {
    unFollow(authorId: $authorId, followerId: $followerId)
}`