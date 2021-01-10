import React, {useState} from 'react'

const authConfirmInitialState = {
    name: '',
}

const authConfirmInitialContext = {
    authConfirmState: authConfirmInitialState,
    setName: (name: string) => {}
}

export const AuthConfirmContext = React.createContext(authConfirmInitialContext)

type AuthConfirmProviderProps = {}

export const AuthConfirmProvider: React.FC<AuthConfirmProviderProps> = (props) => {
    const [authConfirmState, setAuthConfirmState] = useState(authConfirmInitialState)

    function setName(name: string) {
        setAuthConfirmState({ name })
    }
    return (
        <AuthConfirmContext.Provider value={{ authConfirmState, setName }}>
            {props.children}
        </AuthConfirmContext.Provider>
    )
}
