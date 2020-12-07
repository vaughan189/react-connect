import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StatusInput from "../Shared/StatusInput";
import { CREATE_POST } from "../../query/CREATE_POST";
import { GET_POSTS } from '../../query/GET_POSTS'
import { getUserDetails } from "../../services/localStorage.service";

const useStyles = makeStyles({root: { minWidth: 275 }, title: { fontSize: 14 }});

function AddPost() {

    const updateAddPostsCache = (cache: any, { data }: any) => {
        const existingPosts = cache.readQuery({ query: GET_POSTS});
        const newPost = data.createPost;
        cache.writeQuery({ query: GET_POSTS, data: { posts: [...existingPosts.posts, newPost] }})
    };

    const [post, setPost] = useState();
    const [addPost] = useMutation(CREATE_POST, { update: updateAddPostsCache });
    const userDetails = JSON.parse(getUserDetails());

    const onchange = (post: any) => { setPost(post)}

    const submitPost = () => { 
        if(!post) return;
        addPost({ variables: { "title": post, "content": post, "authorId": userDetails.id }})
    }

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" component={'span'} gutterBottom>
                    <StatusInput handlePost={onchange} />
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={submitPost}>Add Post</Button>
            </CardActions>
        </Card>
    );
}

export default AddPost;