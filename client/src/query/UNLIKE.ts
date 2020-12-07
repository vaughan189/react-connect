import gql from "graphql-tag";

export const UNLIKE = gql`
mutation unLike($authorId: String!, $postId: String!) {
  unLike(authorId: $authorId, postId: $postId)
}`