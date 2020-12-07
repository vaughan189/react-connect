import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo';
import { GET_USER_POSTS, FOLLOW_USER, UNFOLLOW_USER, UPLOAD_FILE, CHANGE_PROFILE_PICTURE  } from "../../query";
import { CardContent, Typography, Divider, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { getUserDetails } from '../../services/localStorage.service';
import TabsComponent from "../Shared/Tabs";
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { maxWidth: '60%', marginTop: "2%", marginLeft: "auto", marginRight: "auto" },
        avatar: { backgroundColor: red[400] },
        title: { fontSize: 20, textAlign: "center" },
        inline: { display: 'inline' },
    }),
);

function ProfileComponent(props: any) {
    const userDetails = JSON.parse(getUserDetails());
    const userId = props.match.params.id;
    const { loading, error, data } = useQuery(GET_USER_POSTS, { variables: { id: userId || userDetails.id } });
    const [ followUser ] = useMutation(FOLLOW_USER);
    const [ unFollowUser ] = useMutation(UNFOLLOW_USER);
    const [ changeProfilePicture ] = useMutation(CHANGE_PROFILE_PICTURE);
    const [upload] = useMutation(UPLOAD_FILE, {
        onCompleted({ singleUpload }) {
            changeProfilePicture({ variables: { id: userDetails.id, profile: singleUpload.filename }})
        }
    });
    const classes = useStyles();
    const inputEl = useRef(null);

    function showFollowButton() {
        return (userId && userId !== userDetails.id &&
            data.author.follower.findIndex((follower: any) => follower.authorId === userDetails.id) === -1)
    }

    function showUnfollowButton() {
        return (userDetails.id && userId !== userDetails.id &&
            data.author.follower.findIndex((follower: any) => follower.authorId === userDetails.id) > -1)
    }

    const follow = () => {
        followUser({ variables: { authorId: userDetails.id, followerId: userId } });
    }

    const unFollow = () => {
        unFollowUser({ variables: { authorId: userDetails.id, followerId: userId } });
    }

    function handleClick(e: any){
        inputEl.current.click();
    }

    const changeProfile = (e: any) => {
        const file = e.target.files[0]
        upload({ variables: { file: file } });
    }

    function getProfileComponent() {
        return (
            <div>
                <Card className={classes.root} variant="outlined">
                    <CardHeader className={classes.title} title="Profile" />
                    <Divider light />
                    <CardContent>
                        <Typography color="textSecondary" component={'span'} gutterBottom>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} alt={data.author.firstName + " " + data.author.lastName} onClick={(e) => handleClick(e) }/>
                                </ListItemAvatar>
                                <ListItemText primary={data.author.firstName + " " + data.author.lastName} secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary"></Typography>
                                        {data.author.email}
                                    </React.Fragment>}
                                />
                                <input type="file" ref={inputEl} style={{display: 'none'}} onChange={(e: any) => changeProfile(e)}/>
                                {showFollowButton() && <ListItemSecondaryAction>
                                    <Fab color="secondary" variant="extended" onClick={follow}>Follow</Fab>
                                </ListItemSecondaryAction>}
                                {showUnfollowButton() && <ListItemSecondaryAction>
                                    <Fab color="secondary" variant="extended" onClick={unFollow}>Unfollow</Fab>
                                </ListItemSecondaryAction>}
                            </ListItem>
                        </Typography>
                        <TabsComponent userPostList={data} />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (loading) return <CircularProgress />;
    if (error) return <p>ERROR ...</p>;
    return (
        getProfileComponent()
    )
}

export default withRouter(ProfileComponent)