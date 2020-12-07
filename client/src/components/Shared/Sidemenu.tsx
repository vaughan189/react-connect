import React, { useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({ list: { width: 250 }, fullList: { width: 'auto' } });

const SideMenuComponent = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const [state, setState] = React.useState({ left: false });
    let history = useHistory();

    type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
    const toggleDrawer = (side: DrawerSide, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) { return }
        setState({ ...state, [side]: open });
    };

    useImperativeHandle(ref, () => ({ toggleDrawer: toggleDrawer('left', true) }));

    const routeChange = (path: string) => {
        history.push(path);
    }

    const sideList = (side: DrawerSide) => (
        <div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
            <List>
                <ListItem button onClick={() => routeChange('home')}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <ListItem button onClick={() => routeChange('my-posts')}>
                    <ListItemIcon><LocalPostOfficeIcon /></ListItemIcon>
                    <ListItemText primary='My Posts' />
                </ListItem>
                <ListItem button onClick={() => routeChange('search')}>
                    <ListItemIcon><SearchOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='Search' />
                </ListItem>
                <ListItem button onClick={() => routeChange('profile')}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary='Profile' />
                </ListItem>
            </List>
        </div>
    );
    return (
        <div>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
})

export default SideMenuComponent;