import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ColorSchemesExample from "../components/nav";
import './Login.css';
import axios from 'axios';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import api from "../api/api";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

   

    const handleSignin = (e) => {
        e.preventDefault();
        api.post('/signin', {
            email,
            password
        }).then((response) => {
            console.log(response);
            // navigate to Gallery page
            window.location.href = '/';
            
        }).catch((error) => {
            console.log(error);
            // Handle login error
        });
    };

    return (
        <div>
            <ColorSchemesExample />
            <div className="login-page">
                <MDBContainer fluid className='p-4'>
                    <MDBRow>
                        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                            <h1 className="my-5 display-3 fw-bold ls-tight px-3 login-title">
                                Secure  <br />
                                <span className="text-primary">Image Encryption Login</span>
                            </h1>
                            <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Unlock a world of image security. Log in to your PicGuard account to encrypt, decrypt, and safeguard your images with ease. Your privacy is our priority.
                            </p>
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBCard className='my-5'>
                                <MDBCardBody className='p-5'>
                                    <form onSubmit={handleSignin}>
                                        <MDBInput
                                            wrapperClass='mb-4'
                                            label='Email'
                                            id='form1'
                                            type='email'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <MDBInput
                                            wrapperClass='mb-4'
                                            label='Password'
                                            id='form2'
                                            type='password'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className='d-flex justify-content-center mb-4'>
                                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                        </div>
                                        <MDBBtn className='w-100 mb-4' size='md' type='submit'>Login</MDBBtn>
                                    </form>
                                    <div className="text-center">
                                        <p>or sign up with:</p>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='facebook-f' size="sm" />
                                        </MDBBtn>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='twitter' size="sm" />
                                        </MDBBtn>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='google' size="sm" />
                                        </MDBBtn>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='github' size="sm" />
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}
