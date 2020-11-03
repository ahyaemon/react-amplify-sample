import React, {useContext, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Auth } from 'aws-amplify'
import {AuthContext} from '../context/AuthProvider'

function SignIn() {
    const authContext = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    function handleSignInClick() {
        Auth.signIn(email, password)
            .then(res => {
                authContext.signIn(res.username, res.username)
                history.push('/')
            })
            .catch(e => {
                history.push('/error')
            })
    }

    function handleGoogleSignInClick() {
        Auth.federatedSignIn({ provider: 'Google' })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return(
        <div>
            sign in
            <form>
                <div>
                    email:
                    <input type="text" value={email} onChange={ (e) => { setEmail(e.target.value) } }/>
                </div>
                <div>
                    password:
                    <input type="password" value={password} onChange={ (e) => { setPassword(e.target.value) } }/>
                </div>
                <div>
                    <button type="button" onClick={handleSignInClick}>Sign In</button>
                </div>
            </form>
            <hr/>
            <button onClick={handleGoogleSignInClick}>sign in with google</button>
            <hr/>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default SignIn
