import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import "./App.css";


export default function Logdlog() {
    const navigateR = useNavigate(null)
    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token" + response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        navigateR("/Music")
    }

    function handleSignOut() {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google*/
        console.log('auth')
        google && google.accounts.id.initialize({
            // eslint-disable-next-line no-undef
            client_idgoogle:
                import.meta.env.VITE_CLIENT_ID_GOOGLE,
            // "113265393676-aik3m9ah8an7c0tftv04ktrhbds8gs4g.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

        google && google.accounts.id.renderButton(document.getElementById("signInDiv"), {

            // if (google login = true) {

            // }
            theme: "outline",
            size: "large",
        });
    }, []);

    return (
        <div className="Logdlog">
            <div id="signInDiv"></div>
            {Object.keys(user).length != 0 && (
                <button onClick={(e) => { handleSignOut(e); }
                }>Sign Out </button>
            )}
            {user && (
                <div>
                    <img src={user.picture} />
                    <h3>{user.name}</h3>
                </div>
            )}
        </div>
    );
}
