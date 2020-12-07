import gql from "graphql-tag";

export const LIKE = gql`
mutation like($authorId: String!, $postId: String!) {
    like(authorId: $authorId, postId: $postId) {
        authorId
        postId
    }
}`