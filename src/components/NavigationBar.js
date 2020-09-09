import React from 'react';
import pokeball from '../images/pokeball.png'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

export default function NavigationBar (props) {
    
    return (
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
            <Navbar.Brand className="ml-5"> <img src={pokeball} alt="" style={{width: 'auto'}}/> Pokebattle</Navbar.Brand>
            {props.currentUser ? 
                <>
                <Nav className="mr-auto">
                    <NavLink className="ml-5" to="/">Home</NavLink>
                    <NavLink className="ml-5" to="/teams">My Teams</NavLink>
                    <NavLink className="ml-5" to="/playground">Playground</NavLink>
                </Nav>
                <NavLink className="btn btn-primary mr-4" onClick={props.handleLogout} to="/" >Log Out</NavLink>
                </>
            :
                <Nav>
                    <NavLink to="/login"><Button>Login</Button></NavLink>
                    <NavLink to="/signup"><Button>Signup</Button></NavLink>
                </Nav>
            }
            
        </Navbar>
    )
}