import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
mutation addComment(
  $authorId: String!
  $postId: String!
  $commentText: String!
) {
  addComment(authorId: $authorId, postId: $postId, commentText: $commentText) {
    authorId
    postId
    commentText
  }
}`