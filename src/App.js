import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Top from './top/Top'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import SignUpConfirm from './auth/SignUpConfirm'
import { Auth } from 'aws-amplify'

const styles = {
    app: {
        margin: 20,
    },
    a: {
        color: "black",
        textDecoration: "none",
    }
}

function App() {
    function handleSignOutClick() {
        Auth.signOut().then(res => { console.log({ message: 'sign out: ok', res }) }).catch(e => { console.log(e) })
    }

    return (
        <BrowserRouter>
            <div style={styles.app}>
                <div>
                    <h1>
                        <Link to="/" style={styles.a}>
                            Ahyaemon Amplify Sample
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                            <button type="button" onClick={handleSignOutClick}>Sign Out</button>
                        </li>
                    </ul>
                    <hr/>
                </div>
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
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
