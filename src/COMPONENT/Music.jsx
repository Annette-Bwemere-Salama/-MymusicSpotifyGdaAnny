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
// import { BsFillCaretRightSquareFill } from "react-icons/bs";


const CLIENT_ID = "8eeb90f7753a45548dd9e8a19da17fd9";
const CLIENT_SECRET = "665e67a536144aa9ab70cf954e51d307";


export default function Music() {
    const [searchInput, setSearchInput] = useState("MIKE KALAMBAY");
    const [accessToken, setAccessToken] = useState();
    const [albums, setAlbums] = useState([]);
    const [artistId, setArtistId] = useState('');
    let maLecture = null;

    useEffect(() => {
        //API ACCCESS TOKEN  acceder au token
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
                // console.log(data)
                setArtistId(data.artists.items[0].id);
            })
        // search()
    }
    useEffect(() => {
        // console.log("Artist Id is" + artistId)

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
                setAlbums(data.items) && maLecture;
            });

    }, [artistId])
    console.log(maLecture);

    search();
    // obtenir une requête en utilisant la recherche par le nom de l'album de l'artiste
    return (
        <div className="App">
            <Container>
                <InputGroup className="mb-3" size="1g">
                    <FormControl
                        placeholder="Search for Artist"
                        type="input"
                        onKeyPress={(event) => {
                            maLecture = "https://open.spotify.com/embed/album/" + albums[0].id + "?utm_source=generator"
                            if (event.key == "Enter") {

                                search();
                            }
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}

                    />
                    <Button
                        onClick={search}
                        className="glyphicon glyphicon-search">
                        Search
                    </Button>
                </InputGroup>
            </Container>

            <Container className='text-bg-success '>

                <Row className="ms-2 row">
                    {albums && albums.map((album, i) => {
                        return (
                            <Card key={i} className='col-md-3 m-3 text-dark'>
                                <Card.Img src={album.images[0].url} className=' img-circle' />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}

                </Row>
                <div style={{ zIndex: 40, position: 'fixed', bottom: 0, left: 0 }}>
                    <iframe style={{ backgroundColor: 'grey', zIndex: 70 }} src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`} width="300" height="300" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>

            </Container>
        </div >
    );
}

