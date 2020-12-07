import React from 'react'
import { Divider, Typography, Avatar, Card, CardHeader, CardContent, CardActions, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import CommentComponent from "../Pages/Comment"
import DeleteIcon from '@material-ui/icons/Delete';
import { getUserDetails } from '../../services/localStorage.service';
import { LIKE } from "../../query/LIKE";
import { UNLIKE } from "../../query/UNLIKE";
import { useMutation } from 'react-apollo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { width: '100%', maxWidth: "100%", backgroundColor: theme.palette.background.paper },
        inline: { display: 'inline' },
        title: { fontSize: 14 }
    }),
);

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({ badge: { right: -3, top: 13, border: `2px solid ${theme.palette.background.paper}`, padding: '0 4px' } }))(Badge);

export default function Lists(props: any) {
    const userDetails = JSON.parse(getUserDetails());
    const [like] = useMutation(LIKE);
    const [unLike] = useMutation(UNLIKE);

    const isPostLiked = () => { return (props.post.likes.findIndex((like: any) => like.authorId === userDetails.id) > -1) }

    const likePost = () => { like({ variables: { "authorId": userDetails.id, "postId": props.post.id } }) }
    const unLikePost = () => { unLike({ variables: { "authorId": userDetails.id, "postId": props.post.id } }) }

    const handlePostLike = () => {
        isPostLiked() ? unLikePost(): likePost()
    }

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={<Avatar alt={props.post.author.firstName} src="/static/images/avatar/1.jpg" />}
                    action={
                        <IconButton aria-label="delete" onClick={e => { props.handleDeletePost(props.post.id) }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                    title={props.post.title}
                    subheader={props.post.author.email} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.post.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="cart" color={isPostLiked() ? 'secondary' : "default"} onClick={ e => { handlePostLike() }}>
                        <StyledBadge badgeContent={Object.keys(props.post.likes).length} color="primary">
                            <FavoriteIcon />
                        </StyledBadge>
                    </IconButton>
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={Object.keys(props.post.comments).length} color="primary">
                            <CommentIcon />
                        </StyledBadge>
                    </IconButton>
                </CardActions>
            </Card>
            <CommentComponent comments={props.post.comments} postId={props.post.id} />
            <Divider light />
        </div>
    )
}