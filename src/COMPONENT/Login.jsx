// import React, { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
// import "./App.css";

// export default function Logdlog() {
//   const [user, setUser] = useState({});

//   function handleCallbackResponse(response) {
//     console.log("Encoded JWT ID token" + response.credential);
//     let userObject = jwt_decode(response.credential);
//     console.log(userObject);
//     setUser(userObject);
//     document.getElementById("signInDiv").hidden = true;
//   }

//   function handleSignOut(event) {
//     setUser({});
//     document.getElementById("signInDiv").hidden = false;
//   }

//   useEffect(() => {
//     /* global google*/
//     google.accounts.id.initialize({
//       client_id:
//         "113265393676-9g0r5rgegqcoigqs15fab9quajhio7qd.apps.googleusercontent.com",

//       callback: handleCallbackResponse,
//     });

//     google.accounts.id.renderButton(document.getElementById("signInDiv"), {
//       theme: "outline",
//       size: "large",
//     });
//   }, []);

//   return (
//     <div className="Logdlog">
//       <div id="signInDiv"></div>
//       {Object.keys(user).length != 0 && (
//         <button onClick={(e) => handleSignOut(e)}>Sign Out </button>
//       )}
//       {user && (
//         <div>
//           <img src={user.picture} />
//           <h3>{user.name}</h3>
//         </div>
//       )}
//     </div>
//   );
// }
