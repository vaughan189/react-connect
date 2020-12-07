import gql from 'graphql-tag';

export const SEARCH = gql`
mutation search($searchQuery: String!) {
    search(searchQuery: $searchQuery) {
      id
      firstName
      lastName
      email
    }
}`;