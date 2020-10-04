import React, {useEffect, useState} from 'react'
import { Auth, Hub } from 'aws-amplify'

function NeedAuth(props) {
    const [signedIn, setSignedIn] = useState(false)
    const [username, setUsername] = useState("testman")
    const [password, setPassword] = useState("Password0")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setSignedIn(true)
        } else {
            setSignedIn(false)
        }
    }, [])

    async function handleOnClick() {
        try {
            await Auth.signIn(username, password)
            setSignedIn(true)
            localStorage.setItem("token", "token")
        } catch (e) {
            console.log(e)
        }
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    async function handleGoogleSignIn() {
        const result = await Auth.federatedSignIn({provider: "Google"})
        localStorage.setItem("credential", result)
    }

    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            console.log( { event, data })
        })
    })

    Auth.currentAuthenticatedUser().then(res => {console.log(res)})

    return signedIn ? (
        <div>
            { props.children }
        </div>
    ) : (
        <div>
            <div>
                <label htmlFor="username">username: </label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div>
                <label htmlFor="password">password: </label>
                <input type="text" id="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="button" onClick={handleOnClick}>Sign In</button>
            </div>

            <div style={styles.marginTop}>
                <button type="button" onClick={ handleGoogleSignIn }>GOOGLE LOGIN</button>
            </div>

            <div style={styles.marginTop}>
                <button type="button" onClick={ Auth.signOut }>Sign Out</button>
            </div>
        </div>
    )
}

const styles = {
    marginTop: { marginTop: 40 },
}

export default NeedAuth
