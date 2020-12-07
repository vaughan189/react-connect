import React, { useRef } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { removeUserDetails } from "../../services/localStorage.service";
import SideMenuComponent from './Sidemenu';

const useStyles = makeStyles(theme => ({root: { flexGrow: 1}, menuButton: { marginRight: theme.spacing(2)}, title: { flexGrow: 1 }}));

function NavigationBar() {
    const classes = useStyles();
    let history = useHistory();
    const toggleSidemenu = useRef<any>(null);

    function logout() {
        removeUserDetails();
        history.push('/login');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleSidemenu.current.toggleDrawer('left', true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Social Media App
                </Typography>
                <Button color="inherit" onClick={e => { logout() }}>Logout</Button>
            </Toolbar>
            <SideMenuComponent ref={toggleSidemenu} />
        </AppBar>
    )
}

export default NavigationBar;