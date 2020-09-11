import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Pokedex from './components/pokemon/Pokedex';
import TeamListings from './components/team/TeamListings';
import Playground from './components/Playground';
import Battle from './components/battle/Battle';
import './App.css';

const URL = 'http://localhost:3001/'

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = userObj => {
    setCurrentUser(userObj);
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
              <Route exact path="/"><Home {...currentUser} /> </Route>
              <Route exact path="/pokedex"><Pokedex /></Route>
              <Route exact path="/teams"><TeamListings /></Route>
              <Route exact path="/playground"><Playground {...currentUser} /></Route>
              <Route exact path="/login">
                {!!currentUser ? <Redirect to="/" /> : <Login handleLogin={handleLogin} currentUser={currentUser} />}
              </Route> 
                
              <Route exact path="/signup"> 
                {!!currentUser ? <Redirect to="/" /> : <Signup handleLogin={handleLogin} currentUser={currentUser} />}
              </Route>
              <Route exact path="/battle"><Battle {...currentUser} /></Route>

            </Switch>
          </Col>

        </Row>
      </Container>

    </Router>
  );
}

export default App;
