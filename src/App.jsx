import React from "react";
import { useEffect, useState } from "react";
// import Logdlog from "./COMPONENT/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

const CLIENT_ID = "8eeb90f7753a45548dd9e8a19da17fd9";
const CLIENT_SECRET = "665e67a536144aa9ab70cf954e51d307";

// function RetourRes() {
//   return (

//   );
// }

function App() {
  const [searchInput, setSearchInput] = useState("gims");
  const [accessToken, setAccessToken] = useState();
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
        setAccessToken(data.access_token);
        console.log(accessToken?.access_token);
      });
  }, []);
  useEffect(() => {
    if (accessToken) search();
  }, [accessToken]);

  search();

  async function search() {
    console.log(accessToken.access_token);
    //obtenir une requête en utilisant la recherche pour obtenir l'identifiant de l'artiste
    let artisteParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken?.access_token,
      },
    };
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artisteParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.artists && data.artists.items && data.artists.items[0].id;
      });

    fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}
        &type=artist&limit=20/n`,
      artisteParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log("l'artiste c'est " + artistID);
    // obtenir une requête en utilisant la recherche par le nom de l'album de l'artiste
    let returndAlbums = fetch(
      "https://api.spotify.com/v1/artists/" +
      artistID +
      "/albums" +
      "?include_groups=album&market=US&limit=50" +
      artisteParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbum(data.items);
      });
  }
  return (
    <div>
      <Container>
        <InputGroup className="mb-3" size="1g">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                console.log("Pressed enter");
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button
            onClick={() => {
              console.log("clicked Button");
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row-cols-4">
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>album name Here</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>album name Here</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>album name Here</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>album name Here</Card.Title>
            </Card.Body>
          </Card>
        </Row>

      </Container>
    </div>
  );
}

export default App;
