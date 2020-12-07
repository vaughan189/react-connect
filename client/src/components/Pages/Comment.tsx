import React, { useState } from 'react'
import {
    Typography, Avatar, Card, CardContent, CardActions, TextField,
    Button, List, ListItem, ListItemAvatar, ListItemText, makeStyles,
    Theme, createStyles
} from '@material-ui/core';
import { ADD_COMMENT } from "../../query/ADD_COMMENT"
import { useMutation } from 'react-apollo';
import { getUserDetails } from '../../services/localStorage.service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { width: '100%', maxWidth: "100%", backgroundColor: theme.palette.background.paper },
        inline: { display: 'inline' },
        title: { fontSize: 14 }
    }),
);

function CommentComponent(props: any) {
    const [comment, setComment] = useState();
    const [ addComment ] = useMutation(ADD_COMMENT);
    const classes = useStyles();
    const userDetails = JSON.parse(getUserDetails());

    const handleAddComment = () => {
        if (!comment) return;
        addComment({ variables: { "authorId": userDetails.id, "postId": props.postId, "commentText": comment } })
    }

    const onchange = (comment: any) => { setComment(comment) }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" component={'span'} gutterBottom>
                    <TextField label="Comment"
                        style={{ margin: 10 }}
                        placeholder="Add Comment"
                        fullWidth margin="normal"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        onChange={e => onchange(e.target.value)} />
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" onClick={handleAddComment}>Add Comment</Button>
            </CardActions>
            {(props.comments.map((comment: any, index: number) => (
                <List className={classes.root} key={index}>
                    <ListItem button alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={comment.author.firstName + " " + comment.author.lastName} src="" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.commentText}
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                        {comment.author.firstName + " " + comment.author.lastName}
                                    </Typography>
                                    {"—" + comment.author.email}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            )))}
        </Card>
    )
}

export default CommentComponent;