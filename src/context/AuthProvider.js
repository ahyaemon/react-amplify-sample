import React, {useState} from 'react'

const authInitialState = {
    name: "",
    cognitoUsername: "",
    signedIn: false,
}

const authInitialContext = {
    authState: authInitialState,
    signIn: (name, cognitoUsernamae) => {},
    signOut: () => {},
}

export const AuthContext = React.createContext(authInitialContext)

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(authInitialState)

    function signIn(name, cognitoUsername) {
        setAuthState({
            name,
            cognitoUsername,
            signedIn: true
        })
    }

    function signOut() {
        setAuthState({
            name: '',
            cognitoUsername: '',
            signedIn: false
        })
    }

    return (
       <AuthContext.Provider value={{ authState, signIn, signOut }}>
           {children}
       </AuthContext.Provider>
    )
}
