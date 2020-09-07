import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink} from 'react-router-dom'

export default function NavigationBar (props) {

    const renderAuthenticationOptions = () => {
        if (props.currentUser) {
            return (
                <Button className="mr-4" onClick={props.handleLogout} >Log Out</Button>
            )
        } else {
            return (
                <>
                    <NavLink className="mr-4" to="/login"><Button>Login</Button></NavLink>
                    <NavLink className="mr-5" to="/signup"><Button>Signup</Button></NavLink>
                </>
            )
        }
    }

    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className="ml-5">Pokebattle</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink className="ml-5" to="/">Home</NavLink>
                <NavLink className="ml-5" to="/teams">My Teams</NavLink>
            </Nav>
            <Nav>
                {renderAuthenticationOptions()}
            </Nav>
        </Navbar>
    )
}