import React from 'react';
import pokeball from '../images/pokeball.png'
import logo from '../images/logo.png'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

export default function NavigationBar (props) {
    
    return (
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
            <Navbar.Brand className="ml-5"> <img src={pokeball} alt="" style={{width: 'auto'}}/> <img src={logo} alt="" style={{width: '150px'}}/></Navbar.Brand>
            {props.currentUser ? 
                <>
                <Nav className="mr-auto">
                    <NavLink className="ml-5" to="/teams">My Teams</NavLink>
                    <NavLink className="ml-5" to="/playground">Playground</NavLink>
                </Nav>
                <NavLink className="btn btn-outline-primary mr-4" onClick={props.handleLogout} to="/" >Log Out</NavLink>
                </>
            :
                <Nav>
                    <NavLink className="mr-3" to="/login"><Button variant="outline-primary">Login</Button></NavLink>
                    <NavLink className="mr-5" to="/signup"><Button variant="outline-primary">Signup</Button></NavLink>
                </Nav>
            }
            
        </Navbar>
    )
}