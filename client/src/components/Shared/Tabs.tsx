import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

interface TabPanelProps { children?: React.ReactNode; index: any; value: any; }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}{...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function setTab(index: any) { return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` } }

const useStyles = makeStyles((theme: Theme) => ({
    root: { flexGrow: 10, backgroundColor: theme.palette.background.paper },
    tabs: { minWidth: '33.4%' }
}));

function TabsComponent(props: any) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => { setValue(newValue) };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab className={classes.tabs} label="My Posts" {...setTab(0)} />
                    <Tab className={classes.tabs} label="Followers" {...setTab(1)} />
                    <Tab className={classes.tabs} label="Following" {...setTab(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {(props.userPostList.author.posts.map((post: any, index: number) => (
                    <List key={index}>
                        <ListItem>
                            <ListItemText
                                primary={post.title}
                                secondary={post.content}
                            />
                        </ListItem>
                        <Divider />
                    </List>
                )))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {(props.userPostList.author.follower.map((user: any, index: number) => (
                    <List key={index}>
                        <ListItem>
                            <ListItemText
                                primary={user.author[0].firstName + user.author[0].lastName}
                                secondary={user.author[0].email}
                            />
                        </ListItem>
                        <Divider />
                    </List>
                )))}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {(props.userPostList.author.following.map((user: any, index: number) => (
                    <List key={index}>
                        <ListItem>
                            <ListItemText
                                primary={user.author[0].firstName + user.author[0].lastName}
                                secondary={user.author[0].email}
                            />
                        </ListItem>
                        <Divider />
                    </List>
                )))}
            </TabPanel>
        </div>
    );
}

export default TabsComponent;
