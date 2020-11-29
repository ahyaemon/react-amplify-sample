import React, {ReactElement, useContext, useEffect} from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
import { Auth } from 'aws-amplify'
import {AuthContext} from './context/AuthProvider'
import {IfSignedIn} from "./IfSignedIn";
import {Nav} from "./Nav";
import {Routes} from "./Routes";

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
                    <Nav/>
                    <hr/>
                </div>
                <Routes/>
            </div>
        </BrowserRouter>
    );
}

export default App;
