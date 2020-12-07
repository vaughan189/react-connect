import React, { useState } from "react";
import { Switch, Route, Redirect, Router, withRouter } from "react-router-dom";
import NavigationBar from "./Shared/NavigationBar";
import LoginComponent from "./Pages/Login";
import HomeComponent from "./Pages/Home";
import ProfileComponent from "./Pages/Profile"
import { getUserDetails } from "../services/localStorage.service";
import SearchComponent from "./Pages/Search";
import MyPostsComponent from "./Pages/MyPosts";

const Index = ({ history }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    history.listen(() => {
        const userDetails = JSON.parse(getUserDetails());
        if (userDetails && userDetails.id) { setIsLoggedIn(true) } else { setIsLoggedIn(false) }
    });
    return (
        <Router history={history}>
            {isLoggedIn ? <NavigationBar /> : null}
            <Switch>
                <Route exact path="/login" render={() => (!isLoggedIn ? (<LoginComponent />) : (<Redirect to="/home" />))} />
                <Route exact path="/home" render={() => (isLoggedIn ? (<HomeComponent />) : (<Redirect to="/login" />))} />
                <Route exact path="/profile" render={() => (isLoggedIn ? (<ProfileComponent />) : (<Redirect to="/login" />))} />
                <Route exact path="/profile/:id" render={() => (isLoggedIn ? (<ProfileComponent />) : (<Redirect to="/login" />))} />
                <Route exact path="/my-posts" render={() => (isLoggedIn ? (<MyPostsComponent/>) : (<Redirect to="/login" />))} />
                <Route exact path="/search" render={() => (isLoggedIn ? (<SearchComponent/>) : (<Redirect to="/login" />))} />
                <Route exact path="/" render={() => (isLoggedIn ? (<HomeComponent />) : (<Redirect to="/login" />))} />
            </Switch>
        </Router>
    )
}

export default withRouter(Index);
