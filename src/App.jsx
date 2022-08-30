import React from "react";
import { useEffect, useState } from "react";

const CLIENT_ID = "8eeb90f7753a45548dd9e8a19da17fd9";
const CLIENT_SECRET = "665e67a536144aa9ab70cf954e51d307";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState([]);
  const [album, setAlbum] = useState("");

  useEffect(() => {
    //API ACCCESS TOKEN
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/k-www-form-urlencoded",
      },
      body:
        "grant_type-client_credentials&client_id" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com.api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.accessToken));
  }, []);

  //Search

  async function search() {
    console.log("Search for" + searchInput);
  }

  //obtenir une requête en utilisant la recherche pour obtenir l'identifiant de l'artiste
  let artisteParameters = {
    method: "GET",
    Headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + accessToken,
    },
  };
  let artisteId = fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&typesartist",
    searchParameters,
    artisteParameters
  )
    .then((response) => response.json())
    .then((data) => {
      return data.artists.items[0].id;
    });
  console.log("Artist ID is" + artisteId);
  //obtenir une requête en utilisant la recherche par le nom de l'album de l'artiste
  let returndAlbums = fetch(
    "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10" +
      artisteId +
      "/albums" +
      "?include_groups=albumarket=US&limit=50",
    searchParameters
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setAlbum(data.items);
    });
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
      <div className="menu">
        {album.map((album, i) => {
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
      </div>
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
