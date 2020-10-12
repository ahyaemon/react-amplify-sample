import React, {useState} from 'react'

const authConfirmInitialState = {
    email: '',
}

const authConfirmInitialContext = {
    authConfirmState: authConfirmInitialState,
    setEmail: (email) => {},
}

export const AuthConfirmContext = React.createContext(authConfirmInitialContext)

export const AuthConfirmProvider = ({ children }) => {
    const [authConfirmState, setAuthConfirmState] = useState(authConfirmInitialState)

    function setEmail(email) {
        setAuthConfirmState({ email })
    }
    return (
        <AuthConfirmContext.Provider value={{ authConfirmState, setEmail }}>
            {children}
        </AuthConfirmContext.Provider>
    )
}
