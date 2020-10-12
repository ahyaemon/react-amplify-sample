import React, {useState} from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'

function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    async function handleSignUpClick() {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            });
            history.push("/signup-confirm")
        } catch (error) {
            history.push('/error')
        }
    }

    return(
        <div>
            sign up
            <form>
                <div>
                    username:
                    <input type="text" value={username} onChange={ (e) => { setUsername(e.target.value) } }/>
                </div>
                <div>
                    email:
                    <input type="text" value={email} onChange={ (e) => { setEmail(e.target.value) } }/>
                </div>
                <div>
                    password:
                    <input type="password" value={password} onChange={ (e) => { setPassword(e.target.value) } }/>
                </div>
                <div>
                    <button type="button" onClick={handleSignUpClick}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
