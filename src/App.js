import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teams, setTeams] = useState(null)
  const [team, setTeam] = useState(null);

  const handleLogin = userObj => {
    setCurrentUser(userObj)
    setTeams(userObj.teams)
  }

  useEffect(() => {
    if (currentUser && teams) {
      const activeTeam = teams.find(team => team.id === currentUser.activeTeam)
      setTeam(activeTeam)
    }
  }, [teams, currentUser])


  useEffect(() => {
    if (localStorage.token) {
      fetch('http://localhost:3001/autologin', {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setTeams(null);
    setTeam(null);
  }

  return (
    <Router>
      <NavigationBar currentUser={currentUser} handleLogout={handleLogout} />

      <Container fluid>
        <Row>

          <Col md={2}>
            <Sidebar team={team} {...currentUser} />
          </Col>

          <Col md={10}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" 
                render={() => (
                  !!currentUser ? <Redirect to="/" />
                  :
                  <Login 
                    handleLogin={handleLogin} 
                    currentUser={currentUser}
                  />
                )}
              />
              <Route exact path="/signup" 
                render={() => (
                  !!currentUser ? <Redirect to="/" />
                  :
                  <Signup
                    handleLogin={handleLogin}
                    currentUser={currentUser}
                  />
                )} 
              />
            </Switch>
          </Col>

        </Row>
      </Container>

    </Router>
  );
}

export default App;
