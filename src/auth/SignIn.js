import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Auth } from 'aws-amplify'

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSignInClick() {
        Auth.signIn(email, password)
            .then(res => { console.log(res) })
            .catch(e => { console.log('error sign in', e)})
    }

    function handleCheckClick() {
        Auth.currentAuthenticatedUser().then(r => {console.log(r)})
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
                    <input type="text" value={password} onChange={ (e) => { setPassword(e.target.value) } }/>
                </div>
                <div>
                    <button type="button" onClick={handleCheckClick}>Check</button>
                </div>
                <div>
                    <button type="button" onClick={handleSignInClick}>Sign In</button>
                </div>
            </form>

            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default SignIn
