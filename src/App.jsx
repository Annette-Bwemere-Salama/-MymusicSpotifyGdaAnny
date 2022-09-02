import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";

export default function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "113265393676-9g0r5rgegqcoigqs15fab9quajhio7qd.apps.googleusercontent.com",

      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return(
  <div className="App">
    <div id="signInDiv"></div>
    {Object.keys(user).length != 0 && (
      <button onClick={(e) => handleSignOut(e)}>Sign Out </button>
    )}
    {user && (
      <div>
        <img src={user.picture} />
        <h3>{user.name}</h3>
      </div>
    )}
  </div>)
}









// import React from "react";
// import { useEffect, useState } from "react";

// const CLIENT_ID = "8eeb90f7753a45548dd9e8a19da17fd9";
// const CLIENT_SECRET = "665e67a536144aa9ab70cf954e51d307";

// // function RetourRes() {
// //   return (

// //   );
// // }

// function App() {
//   const [searchInput, setSearchInput] = useState("gims");
//   const [accessToken, setAccessToken] = useState();
//   const [album, setAlbum] = useState("");

//   useEffect(() => {
//     //API ACCCESS TOKEN
//     let authParameters = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body:
//         "grant_type=client_credentials&client_id=" +
//         CLIENT_ID +
//         "&client_secret=" +
//         CLIENT_SECRET,
//     };
//     fetch("https://accounts.spotify.com/api/token", authParameters)
//       .then((result) => result.json())
//       .then((data) => {
//         console.log(data, accessToken?.access_token);
//         setAccessToken(data.access_token);
//         console.log(accessToken?.access_token);
//       });
//   }, []);
//   useEffect(() => {
//     if (accessToken) search();
//   }, [accessToken]);

//   // search();

//   async function search() {
//     console.log(accessToken.access_token);
//     //obtenir une requête en utilisant la recherche pour obtenir l'identifiant de l'artiste
//     let artisteParameters = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + accessToken?.access_token,
//       },
//     };
//     let artistID = await fetch(
//       "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
//       artisteParameters
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         return data.artists && data.artists.items && data.artists.items[0].id;
//       });

//     fetch(
//       `https://api.spotify.com/v1/search?q=${searchInput}
//         &type=artist&limit=20/n`,
//       artisteParameters
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         return data.artists.items[0].id;
//       });

//     console.log("l'artiste c'est " + artistID);
//     // obtenir une requête en utilisant la recherche par le nom de l'album de l'artiste
//     let returndAlbums = fetch(
//       "https://api.spotify.com/v1/artists/" +
//         artistID +
//         "/albums" +
//         "?include_groups=album&market=US&limit=50" +
//         artisteParameters
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setAlbum(data.items);
//       });
//   }
//   return (
//     <div className="App">
//       <h1>Mes préferer</h1>
//       <form
//         placeholder="Rechercher une chanson par nom ou par musicien"
//         className="monbutton"
//         onKeyPress={(event) => {
//           if (event.key == "Enter") {
//             search();
//           }
//         }}
//         onChange={(event) => setSearchInput(event.target.value)}
//       >
//         <input></input>
//         <button onClick={search}>Sarch</button>
//       </form>
//       {/* <div className="menu">
//         {album.map((album, i) => {
//           <main>
//             <img src={album.images[0]} />
//             <h5>{album}</h5>
//           </main>;
//         })}
//       </div> */}
//     </div>
//   );
// }

// export default App;
