import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';


export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchLogin();
    }

    const fetchLogin = () => {
        const credentials = {
            user: {
                username: username,
                password: password
            }
        }
        fetch('http://localhost:3001/login', {
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
                    <label name="username">Username</label>
                    <input type="text" name="username" onChange={handleChange} value={username} />
                    <label name="password">Password</label>
                    <input type="password" name="password" autoComplete="off" onChange={handleChange} value={password} />
                    <button>Login</button>
                </form>
            </Col>
            </Row>
        </Container>
    )
}