import React from "react";
import { useEffect, useState } from "react";
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


export default function Music() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState();
    const [albums, setAlbums] = useState([]);
    const [artistId, setArtistId] = useState('')

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
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))


    }, []);

    //Search

    async function search() {
        console.log("Search for" + (" ") + searchInput);

        let searchParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            },
        }
        fetch(
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
            searchParameters
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setArtistId(data.artists.items[0].id);
            })
        // search()
    }

    useEffect(() => {
        console.log("Artist Id is" + artistId)

        let searchParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            },
        }

        fetch("https://api.spotify.com/v1/artists/" + artistId + '/albums', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            });

    }, [artistId])
    console.log(albums);
    // obtenir une requête en utilisant la recherche par le nom de l'album de l'artiste

    return (
        <div className="App">
            <Container>
                <InputGroup className="mb-3" size="1g">
                    <FormControl
                        placeholder="Search for Artist"
                        type="input"
                        onKeyPress={(event) => {
                            if (event.key == "Enter") {
                                search();
                            }
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <Button
                        onClick={search}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {albums && albums.map((album, i) => {
                        console.log(album)
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}

