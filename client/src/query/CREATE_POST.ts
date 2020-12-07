import gql from 'graphql-tag';

export const CREATE_POST = gql`
mutation CreatePost($title: String!, $content: String!, $authorId: ID!) {
  createPost(title: $title, content: $content, authorId: $authorId) {
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
}
  `;