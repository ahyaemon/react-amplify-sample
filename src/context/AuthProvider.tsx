import React, {useState} from 'react'

const authInitialState = {
    name: "",
    cognitoUsername: "",
    signedIn: false,
}

const authInitialContext = {
    authState: authInitialState,
    signIn: (name: string, cognitoUsernamae: string) => {},
    signOut: () => {},
}

export const AuthContext = React.createContext(authInitialContext)

type AuthProviderProps = {}

export const AuthProvider: React.FC<AuthProviderProps> = (props)=> {
    const [authState, setAuthState] = useState(authInitialState)

    function signIn(name: string, cognitoUsername: string) {
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
           {props.children}
       </AuthContext.Provider>
    )
}
