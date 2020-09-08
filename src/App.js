import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Pokedex from './components/Pokedex';
import TeamListings from './components/TeamListings';
import AddPokemonForm from './components/AddPokemonForm'
import './App.css';

const URL = 'http://localhost:3001/'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teams, setTeams] = useState(null);

  const handleLogin = userObj => {
    setCurrentUser(userObj);
    setTeams(userObj.teams)
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (localStorage.token) {
      fetch(`${URL}autologin`, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error) {
          const { user } = data
          handleLogin(user)
        }
      })
    }
  }, [])

  

  return (
    <Router>
      <NavigationBar currentUser={currentUser} handleLogout={handleLogout} />

      <Container fluid>
        <Row>

          <Col md={12}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokedex"><Pokedex/></Route>
              <Route exact path="/addpokemon"><AddPokemonForm teams={teams} /></Route>
              <Route exact path="/teams">
                <TeamListings />
              </Route>
              <Route exact path="/login">
                {!!currentUser ? <Redirect to="/" /> : <Login handleLogin={handleLogin} currentUser={currentUser} />}
              </Route> 
                
              <Route exact path="/signup"> 
                {!!currentUser ? <Redirect to="/" /> : <Signup handleLogin={handleLogin} currentUser={currentUser} />}
              </Route>

            </Switch>
          </Col>

        </Row>
      </Container>

    </Router>
  );
}

export default App;
