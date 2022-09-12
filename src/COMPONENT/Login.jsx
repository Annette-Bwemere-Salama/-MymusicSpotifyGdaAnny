import React from 'react'
import {
    Container, Card
} from 'react-bootstrap'
import './Login.css';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate(null)
    return (
        <Container className="main">

            <h2 className='p-1 text-success'>SpotifAnnyMusic</h2>
            <div className='row'>
                <div className='col text-center'>

                    <button type="button" className='btn btn-success' onClick={() => {
                        navigate("/Loglog")
                    }}>Connect To SpotifAnny</button>
                </div>
            </div>

        </Container>
    )
}

