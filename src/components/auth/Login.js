import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';


export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
                setError(data.error);
                setUsername("");
                setPassword("");
            }
        })
    }

    return (
        <Container className="d-flex justify-content-center backgroundFormDiv">
            <div className="d-flex justify-content-center">
                <br/>
                <div className="formDiv pt-5">
                    <h5 className="text-center">Log In</h5>
                    <hr className="pb-3" />
                    
                    <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center mt-5">
                        <label name="username">
                        </label>
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} value={username} />
                        <label className="mb-5" name="password">
                        </label>
                        <input type="password" name="password" placeholder="Password" autoComplete="off" onChange={handleChange} value={password} />
                        <br/>
                        <div className="d-flex justify-content-center mb-5">
                            <Button className="auth-btn" variant="outline-info" type="submit">Log In</Button>

                        </div>
                        <span className="error">{error}</span>
                    </form>
                </div>
            </div>

        </Container>
    )
}

