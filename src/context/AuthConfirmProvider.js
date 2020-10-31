import React, {useState} from 'react'

const authConfirmInitialState = {
    name: '',
}

const authConfirmInitialContext = {
    authConfirmState: authConfirmInitialState,
    setName: (name) => {}
}

export const AuthConfirmContext = React.createContext(authConfirmInitialContext)

export const AuthConfirmProvider = ({ children }) => {
    const [authConfirmState, setAuthConfirmState] = useState(authConfirmInitialState)

    function setName(name) {
        setAuthConfirmState({ name })
    }
    return (
        <AuthConfirmContext.Provider value={{ authConfirmState, setName }}>
            {children}
        </AuthConfirmContext.Provider>
    )
}
