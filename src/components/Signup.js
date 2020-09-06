import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap'

export default function Signup(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
            case 'confirmPassword':
                setConfirmPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchSignup();
    }

    const fetchSignup = () => {
        const credentials = {
            user: {
                username: username,
                password: password,
                password_confirmation: confirmPassword
            }
        }
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
                console.log(data.error)
            }
        })
    }

    return (
        <Container>
            <Row>
            <Col md={8}>
                <form onSubmit={handleSubmit}>
                    <label name="username">New Username</label>
                    <input type="text" name="username" onChange={handleChange} value={username} />
                    <label name="password">Password</label>
                    <input type="password" name="password" autoComplete="off" onChange={handleChange} value={password} />
                    <label name="password">Confirm Password</label>
                    <input type="password" name="confirmPassword" autoComplete="off" onChange={handleChange} value={confirmPassword} />
                    <button>Create Account</button>
                </form>
            </Col>
            </Row>
        </Container>
    )
}