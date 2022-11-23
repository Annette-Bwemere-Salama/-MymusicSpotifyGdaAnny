import React from 'react'
import { FaSpotify } from "react-icons/fa";
import {
    Container
} from 'react-bootstrap'
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate(null)
    return (
        <div>
            <div className='faspotify'>
                <FaSpotify className='icons'></FaSpotify>
                <h2 className='p-1 text-success'>SpotifAnnyMusic</h2>
            </div>

            <Container className="main">


                <div className='row'>
                    <div className='col text-center'>

                        <button type="button" className='btn btn-success' onClick={() => {
                            navigate("/Loglog")
                        }}>Connect To SpotifAnny</button>
                    </div>
                </div>

            </Container>
        </div>
    )
}

