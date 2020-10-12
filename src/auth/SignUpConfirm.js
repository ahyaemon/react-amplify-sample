import React, {useState} from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'

function SignUpConfirm() {
    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")
    const history = useHistory()

    function handleConfirmClick() {
        Auth.confirmSignUp(username, code)
            .then(res => {
                history.push('/signin')
            })
            .catch(e => {
                history.push('/error')
            })
    }

    return (
        <div>
            confirm
            <div>
                username:
                <input type="text" value={username} onChange={ e => { setUsername(e.target.value) }}/>
            </div>
            <div>
                code:
                <input type="text" value={code} onChange={ e => {setCode(e.target.value) }}/>
            </div>
            <button type="button" onClick={handleConfirmClick}>確認</button>
        </div>
    )
}

export default SignUpConfirm
