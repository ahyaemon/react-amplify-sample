import React, {useContext} from "react";
import {AuthContext} from "./context/AuthProvider";

type IfSignedInProps = {}

export const IfSignedIn: React.FC<IfSignedInProps> = (props) => {
    const authContext = useContext(AuthContext)
    return　authContext.authState.signedIn ?
        <>{props.children}</> :
        null
}
