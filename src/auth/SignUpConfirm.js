import React, {useContext, useState} from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import {AuthConfirmContext} from '../context/AuthConfirmProvider'

function SignUpConfirm() {
    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")
    const history = useHistory()
    const authConfirmContext = useContext(AuthConfirmContext)

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
                email:
                <input type="text" value={authConfirmContext.authConfirmState.email} onChange={ e => { setUsername(e.target.value) }}/>
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
