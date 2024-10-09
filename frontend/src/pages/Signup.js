import React, { useState } from 'react';
import './Signup.css';
import ColorSchemesExample from '../components/nav';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
    MDBTypography
} from 'mdb-react-ui-kit';
import api from '../api/api';


export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); // Error state for each field

    const validateForm = () => {
        const newErrors = {};
        if (!firstName) newErrors.firstName = 'Please enter your first name';
        if (!lastName) newErrors.lastName = 'Please enter your last name';
        if (!email) newErrors.email = 'Please enter your email';
        if (!password) newErrors.password = 'Please enter your password';
        return newErrors;
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        setErrors({}); // Clear any existing errors
        api.post('/signup', {
            firstName,
            lastName,
            email,
            password,
            newsletter
        }).then((response) => {
            window.location.href = '/';
            console.log(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setErrors({ general: 'Signup failed. Please try again.' });
            setLoading(false);
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
                                Secure Your Memories:) <br />
                                <span className="text-primary">Encrypt and Protect Your Images Online</span>
                            </h1>
                            <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Worried about the safety of your digital photos? Our cutting-edge online image encryption service is here to provide the ultimate protection for your personal and professional images. By joining our platform, you can easily encrypt your images, rendering them unreadable to anyone but you, and securely store them in your private gallery.

                                Our user-friendly interface makes it simple to upload, encrypt, and store your images in just a few steps. When you need to access your photos, our decryption process ensures you can retrieve them quickly and safely. Don’t leave your precious memories vulnerable—sign up today and take control of your image security with our state-of-the-art encryption technology.
                            </p>
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBCard className='my-5'>
                                <MDBCardBody className='p-5'>
                                    <form onSubmit={handleSignup}>
                                        <MDBRow>
                                            <MDBCol col='6'>
                                                <MDBInput 
                                                    wrapperClass='mb-4' 
                                                    label='First name' 
                                                    id='form1' 
                                                    type='text' 
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className={errors.firstName ? 'is-invalid' : ''}
                                                />
                                                {errors.firstName && (
                                                    <MDBTypography className='text-danger mb-2'>
                                                        {errors.firstName}
                                                    </MDBTypography>
                                                )}
                                            </MDBCol>
                                            <MDBCol col='6'>
                                                <MDBInput 
                                                    wrapperClass='mb-4' 
                                                    label='Last name' 
                                                    id='form2' 
                                                    type='text' 
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className={errors.lastName ? 'is-invalid' : ''}
                                                />
                                                {errors.lastName && (
                                                    <MDBTypography className='text-danger mb-2'>
                                                        {errors.lastName}
                                                    </MDBTypography>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBInput 
                                            wrapperClass='mb-4' 
                                            label='Email' 
                                            id='form3' 
                                            type='email' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={errors.email ? 'is-invalid' : ''}
                                        />
                                        {errors.email && (
                                            <MDBTypography className='text-danger mb-2'>
                                                {errors.email}
                                            </MDBTypography>
                                        )}
                                        <MDBInput 
                                            wrapperClass='mb-4' 
                                            label='Password' 
                                            id='form4' 
                                            type='password' 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={errors.password ? 'is-invalid' : ''}
                                        />
                                        {errors.password && (
                                            <MDBTypography className='text-danger mb-2'>
                                                {errors.password}
                                            </MDBTypography>
                                        )}
                                        <div className='d-flex justify-content-center mb-4'>
                                            <MDBCheckbox 
                                                name='flexCheck' 
                                                value='' 
                                                id='flexCheckDefault' 
                                                label='Subscribe to our newsletter' 
                                                checked={newsletter}
                                                onChange={(e) => setNewsletter(e.target.checked)}
                                            />
                                        </div>
                                        {errors.general && (
                                            <MDBTypography className='text-danger mb-4'>
                                                {errors.general}
                                            </MDBTypography>
                                        )}
                                        <MDBBtn type='submit' className='w-100 mb-4' size='md' disabled={loading}>
                                            {loading ? <MDBSpinner size='sm' role='status' tag='span' className='me-2' /> : 'Sign up'}
                                        </MDBBtn>
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
