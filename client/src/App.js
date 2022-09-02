import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
// import {  gapiComplete } from "./gapiScript";
import { gapi } from "gapi-script";
import "./App.css";

function App() {
  const [profile, setProfile] = useState([]);
  const clientId =
    "113265393676-k707lrclbtouf5ubsh4qjobr8dak81gj.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Adress: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in With Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"signe_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default App;
