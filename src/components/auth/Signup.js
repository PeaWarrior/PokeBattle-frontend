import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap'

export default function Signup(props) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({
        usernameError: '',
        passwordError: '',
        passwordConfirmationError: '',
    })

    const handleChange = (event) => {
        console.log(event.target.name)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({
            usernameError: '',
            passwordError: '',
            passwordConfirmationError: ''
        })
        fetchSignup();
    }

    const fetchSignup = () => {
        const credentials = {
            user: formData
        }
        console.log(credentials)
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(resp => resp.json())
        .then(data => {
            if (!data.error) {
                const { user, token } = data
                props.handleLogin(user)
                localStorage.token = token
            } else {
                data.error.forEach(error => {
                    if (error.includes('Username')) {
                        setErrors({...errors, usernameError: error});
                    } else if (error.includes('confirmation')) {
                        setErrors({...errors, passwordConfirmationError: error});
                    } else {
                        setErrors({...errors, passwordError: error});
                    }
                });
            }
        })
    }

    return (
        <Container className="form d-flex justify-content-center">
            <div>
                <div className="formDiv pt-5">
                    <h5 className="text-center">Sign Up</h5>
                    <hr className="divider pb-3" />
                    <br/>
                    <form onSubmit={handleSubmit} className="d-flex flex-column">
                        <label name="username">
                        </label>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
                        {errors.usernameError ? 
                            <span className="error">{errors.usernameError}</span>
                            : 
                            <br/>
                        }
                        
                        <label name="password">
                        </label>
                        <input type="password" name="password" placeholder="Password" autoComplete="off" onChange={handleChange} value={formData.password} />
                        {errors.passwordError ? 
                            <span className="error">{errors.passwordError}</span>
                            : 
                            <br/>
                        }

                        <label name="password">
                        </label>
                        <input type="password" name="password_confirmation" autoComplete="off" placeholder="Confirm password" onChange={handleChange} value={formData.confirmPassword} />
                        {errors.passwordConfirmationError ? 
                            <span className="error">{errors.passwordConfirmationError}</span>
                            : 
                            <br/>
                        }

                        <div className="d-flex justify-content-center">
                            <Button className="auth-btn" type="submit" variant="outline-info">Sign Up</Button>
                            <br/>
                        </div>
                        <br/>
                    </form>
                </div>
            </div>


        </Container>
    )
}