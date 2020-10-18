import React, {useContext, useState} from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import {AuthConfirmContext} from '../context/AuthConfirmProvider'

function SignUpConfirm() {
    const authConfirmContext = useContext(AuthConfirmContext)
    const [username] = useState(authConfirmContext.authConfirmState.name)
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
                <input type="text" value={username} readOnly/>
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
