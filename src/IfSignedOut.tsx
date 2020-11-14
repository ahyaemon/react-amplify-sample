import React, {useContext} from "react";
import {AuthContext} from "./context/AuthProvider";

type IfSignedOutProps = {}

export const IfSignedOut: React.FC<IfSignedOutProps> = (props) => {
    const authContext = useContext(AuthContext)
    return　authContext.authState.signedIn ?
        null :
        <>{props.children}</>
}
