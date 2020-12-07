import gql from 'graphql-tag';

export const POSTS_SUBSCRIPTION = gql`
subscription {
  postAdded {
    mutation
    post {
      id
      title
      content
      authorId
      author {
        firstName
        lastName
        email
      }
      comments {
        authorId
        postId
        commentText
        author {
          firstName
          lastName
          email
        }
      }
      likes {
        authorId
        postId
        author {
          firstName
          lastName
          email
        }
      }
    }
  }
}
`;