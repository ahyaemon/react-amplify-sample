import React, {ReactElement, useContext, useEffect} from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Top from './top/Top'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import SignUpConfirm from './auth/SignUpConfirm'
import { Auth } from 'aws-amplify'
import {AuthContext} from './context/AuthProvider'
import Todos from './todos/Todos'
import {IfSignedIn} from "./IfSignedIn";
import {IfSignedOut} from "./IfSignedOut";

const styles = {
    app: {
        margin: 20,
    },
    a: {
        color: "black",
        textDecoration: "none",
    }
}

function App(): ReactElement {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        async function fn() {
            try {
                const session = await Auth.currentSession()
                console.log('sign in: ', session)

                const payload = session.getIdToken().decodePayload()
                console.log(payload)

                let name = payload.name
                if (!name) {
                    name = payload["cognito:username"]
                }

                authContext.signIn(name, payload["cognito:username"])
            } catch (e) {
                console.log('sign out')
                authContext.signOut()
            }
        }
        fn().catch(e => {console.log(e)})
        // eslint-disable-next-line
    }, [])

    function handleSignOutClick() {
        Auth.signOut()
            .then(res => {
                authContext.signOut()
            })
            .catch(e => { console.log(e) })
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
                    <IfSignedIn>
                        <p>hello, {authContext.authState.name}</p>
                    </IfSignedIn>
                    <ul>
                        <IfSignedOut>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </IfSignedOut>
                        <IfSignedIn>
                            <li>
                                <Link to="/profile">
                                    プロフィール
                                </Link>
                            </li>
                            <li>
                                <Link to="/todos">
                                    TODO
                                </Link>
                            </li>
                            <li>
                                <button type="button" onClick={handleSignOutClick}>Sign Out</button>
                            </li>
                        </IfSignedIn>
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
                    <Route exact path="/todos">
                        <Todos/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
