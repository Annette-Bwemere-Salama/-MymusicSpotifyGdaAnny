import React from "react";
import { useEffect, useState } from "react";

const CLIENT_ID = "8eeb90f7753a45548dd9e8a19da17fd9";
const CLIENT_SECRET = "665e67a536144aa9ab70cf954e51d307";

function App() {
  const [searchInput, setSearchInput] = useState("gims");
  const [accessToken, setAccessToken] = useState({});
  const [album, setAlbum] = useState("");

  useEffect(() => {
    //API ACCCESS TOKEN
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        console.log(data, accessToken?.access_token);
        setAccessToken(accessToken.access_token);
        if (accessToken) {
          search();
        }
      });
  }, []);



  //Search

  function search() {


    //obtenir une requête en utilisant la recherche pour obtenir l'identifiant de l'artiste
    let artisteParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken?.access_token,
      },
    };

    fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput +
        "&type=track,album",
      // authParameters,
      artisteParameters
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      });
    //obtenir une requête en utilisant la recherche par le nom de l'album de l'artiste
    // let returndAlbums = fetch(
    //   "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10" +
    //        +
    //     "/albums" +
    //     "?include_groups=albumarket=US&limit=50",
    //   artisteParameters
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setAlbum(data.items);
    //   });
  }

  //afficher ces albums à l'utilisateur
  return (
    <div className="App">
      <h1>Mes préferer</h1>
      <form>
        <input
          placeholder="Rechercher une chanson par nom ou par musicien"
          className="monbutton"
          onKeyPress={(event) => {
            if (event.key == "Enter") {
              search();
            }
          }}
          onChange={(event) => setSearchInput(event.target.value)}
        ></input>
        <button onClick={search}>Sarch</button>
      </form>
      {/* <div className="menu">
        {/* {album.map((album, i) => {
          return (
            <main
              style={{
                justifyContent: "center",
                height: "150px",
                width: "200px",
              }}
            >
              <img src={album.images[0]} />
              <h5>{album}</h5>
            </main>
          );
        })} 
      </div> */}
      <div
        style={{
          display: "flex",
        }}
      >
        <main
          style={{
            justifyContent: "center",
            height: "150px",
            width: "200px",
          }}
        >
          <img src="vite.svg" alt="photo" />
          <h5>Nom de l'Album</h5>
        </main>
      </div>
    </div>
  );
}

export default App;
