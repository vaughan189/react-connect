import gql from 'graphql-tag';

export const GET_POSTS = gql`{
    posts {
      id,
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
  }`;