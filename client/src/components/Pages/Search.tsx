import React from 'react';
import { Card, CardContent, Typography, makeStyles, TextField, List, ListItem, 
    ListItemAvatar, Avatar, ListItemText, Divider, CircularProgress, InputAdornment } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { SEARCH } from "../../query/SEARCH"
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: { maxWidth: '90%', marginTop: "1%", marginLeft: "auto", marginRight: "auto" },
    inline: { display: 'inline' },
});

function SearchComponent() {
    let history = useHistory();
    const classes = useStyles();
    const [search, { data, loading, error }] = useMutation(SEARCH);

    const onchange = (value: any) => {
        handleSearch(value);
    }

    const handleSearch = (value: any) => {
        if (!value) return;
        search({ variables: { searchQuery: value } });
    }

    const redirectProfilePage = (id: any) => {
        history.push('/profile/'+ id);
    }

    function getSearchInput() {
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography component={'span'} gutterBottom>
                        <TextField id="outlined-basic" label="Search" variant="outlined" style={{ margin: 8 }} fullWidth
                            onChange={e => onchange(e.target.value)} InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>
                            }} />
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    function getSearchResultList() {
        return (
            <div>
                {(data.search.map((user: any, index: number) => (
                    <List key={index}>
                        <ListItem button alignItems="flex-start" onClick={e => { redirectProfilePage(user.id)}}>
                            <ListItemAvatar>
                                <Avatar alt={user.firstName + " " + user.lastName} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary={user.email}
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="body2" className={classes.inline}
                                            color="textPrimary">{user.firstName + " " + user.lastName}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                )))}
            </div>
        )
    }

    function getSearchComponent() {
        return (
            <div className={classes.root} >
                {getSearchInput()}
                {loading && <CircularProgress />}
                {error && <p>ERROR ...</p>}
                {data && getSearchResultList()}
            </div>
        )
    }

    return (
        getSearchComponent()
    )
}

export default SearchComponent;
