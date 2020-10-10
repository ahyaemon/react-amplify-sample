import React, {useState} from 'react'
import { Auth } from 'aws-amplify'

function SignUpConfirm() {
    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")

    function handleConfirmClick() {
        Auth.confirmSignUp(username, code)
            .then(res => {
                console.log({ message: 'confirm: ok', res})
            })
            .catch(e => { console.log(e) })
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
