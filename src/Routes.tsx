import React from "react";
import {Route, Switch} from "react-router-dom";
import Top from "./top/Top";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SignUpConfirm from "./auth/SignUpConfirm";
import Todos from "./todos/Todos";
import {Profile} from "./profile/Profile";

export const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/">
            <Top/>
        </Route>
        <Route exact path="/signin">
            <SignIn/>
        </Route>
        <Route exact path="/signup">
            <SignUp/>
        </Route>
        <Route exact path="/signup-confirm">
            <SignUpConfirm/>
        </Route>
        <Route exact path="/todos">
            <Todos/>
        </Route>
        <Route exact path="/profile">
            <Profile/>
        </Route>
    </Switch>
);
