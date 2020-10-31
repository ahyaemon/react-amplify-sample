import React, {useContext, useEffect} from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Top from './top/Top'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import SignUpConfirm from './auth/SignUpConfirm'
import { Auth } from 'aws-amplify'
import {AuthContext} from './context/AuthProvider'

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
    const authContext = useContext(AuthContext)
    useEffect(() => {
        async function fn() {
            try {
                const session = await Auth.currentSession()
                console.log('sign in: ', session)
                authContext.signIn()
            } catch (e) {
                console.log('sign out')
                authContext.signOut()
            }
        }
        fn().catch(e => {console.log(e)})
    }, [authContext])

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
                    <ul>
                        { !authContext.authState.signedIn &&
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        }

                        { authContext.authState.signedIn &&
                            <li>
                                <button type="button" onClick={handleSignOutClick}>Sign Out</button>
                            </li>
                        }
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
