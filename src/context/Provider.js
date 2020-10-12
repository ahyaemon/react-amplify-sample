import React, {useState} from 'react'

const authInitialState = {
    signedIn: false
}

const authInitialContext = {
    authState: authInitialState,
    signIn: () => {},
    signOut: () => {}
}

export const AuthContext = React.createContext(authInitialContext)

export const Provider = ({ children }) => {
    const [authState, setAuthState] = useState(authInitialState)

    function signIn() {
        setAuthState({signedIn: true})
    }

    function signOut() {
        setAuthState({ signedIn: false })
    }

    return (
       <AuthContext.Provider value={{ authState, signIn, signOut }}>
           {children}
       </AuthContext.Provider>
    )
}
