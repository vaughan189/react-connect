import gql from 'graphql-tag';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    code
    success
    message
    author {
      id
      firstName
      lastName
      email
    }
  }
}
  `;