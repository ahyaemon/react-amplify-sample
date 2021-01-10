import React, {useContext} from "react";
import {IfSignedOut} from "./IfSignedOut";
import {Link} from "react-router-dom";
import {IfSignedIn} from "./IfSignedIn";
import {Auth} from "aws-amplify";
import {AuthContext} from "./context/AuthProvider";

export const Nav: React.FC = () => {
    const authContext = useContext(AuthContext)
    
    function handleSignOutClick() {
        Auth.signOut()
            .then(res => {
                authContext.signOut()
            })
            .catch(e => { console.log(e) })
    }

    return (
        <nav>
            <IfSignedOut>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
            </IfSignedOut>
            <IfSignedIn>
                <li>
                    <Link to="/profile">
                        プロフィール
                    </Link>
                </li>
                <li>
                    <Link to="/todos">
                        TODO
                    </Link>
                </li>
                <li>
                    <button type="button" onClick={handleSignOutClick}>Sign Out</button>
                </li>
            </IfSignedIn>
        </nav>
    )
}
