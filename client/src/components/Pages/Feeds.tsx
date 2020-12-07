import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_POSTS } from '../../query/GET_POSTS'
import { POSTS_SUBSCRIPTION } from '../../query/POSTS_SUBSCRIPTION'
import { CircularProgress } from '@material-ui/core';
import Lists from "../Shared/Lists";
import { DELETE_POST } from '../../query/DELETE_POST';
import { client } from '../../App';
import { getUserDetails } from '../../services/localStorage.service';
import { Alert, AlertTitle } from '@material-ui/lab';

function FeedsComponent(props: any) {
    const userDetails = JSON.parse(getUserDetails());
    const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS);
    subscribeToMore({
        document: POSTS_SUBSCRIPTION, updateQuery: (prev, { subscriptionData }) => {
            props.notify(subscriptionData);
            if (subscriptionData.data.postAdded.post.authorId !== userDetails.id) {
                const existingPosts = client.readQuery({ query: GET_POSTS });
                const newPost = subscriptionData.data.postAdded.post;
                if (existingPosts.posts.findIndex((post: any) => post.id === newPost.id) === -1) {
                    client.writeQuery({ query: GET_POSTS, data: { posts: [...existingPosts.posts, newPost] } });
                }
            }
        }
    })
    const [deletePost] = useMutation(DELETE_POST);

    function handleDelete(id: any) {
        deletePost({ variables: { "id": id }, update: (cache: any) => {
                const existingPosts = cache.readQuery({ query: GET_POSTS });
                const newPost = existingPosts.posts.filter((post: any) => (post.id !== id));;
                cache.writeQuery({ query: GET_POSTS, data: { posts: newPost } })
            }
        })
    }

    function getListComponent() {
        return (data.posts.map((post: any) => (
            <Lists key={post.id} post={post} handleDeletePost={handleDelete} />
        )))
    }

    if (loading) return <CircularProgress />;
    if (error) return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — check it out!
        </Alert>
    )
    if (data) {
        return (
            getListComponent()
        )
    }
}

export default FeedsComponent;