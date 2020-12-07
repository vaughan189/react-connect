import gql from 'graphql-tag';

export const CHANGE_PROFILE_PICTURE = gql`
    mutation updateUserProfilePicture($id: ID!, $profile: String!) {
    updateUserProfilePicture(id: $id, profile: $profile)
    }
`