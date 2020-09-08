import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { Container, Row, Button, InputGroup, Form, FormControl } from 'react-bootstrap';

const URL = 'http://localhost:3001/'

export default function TeamListings() {
    const [teams, setTeams] = useState([]);
    const [newTeamName, setNewTeamName] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = () => {
        fetch(`${URL}teams`, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setTeams(data)
        });
    };

    const createNewTeam = () => {
        fetch(`${URL}teams`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newTeamName})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.error) {
                console.log("ADD ERROR MESSAGES CREATENEWTEAM TEAMLISTINGS")
            } else {
                setTeams([...teams, data])
                setNewTeamName('')
            }
        });
    };

    const handleDeleteTeam = (id) => {
        fetch(`${URL}teams/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setTeams(data)
        });
    };

    const renderTeamCards = () => {
        return teams.map(team => (
            <TeamCard 
                key={team.id} 
                handleDeleteTeam={handleDeleteTeam} 
                {...team} 
            />
        ));
    };

    const handleSubmit = (event) => {
        event.persist();
        event.preventDefault();
        createNewTeam();
        
    };

    const handleChange = (event) => {
        setNewTeamName(event.target.value);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl onChange={handleChange} value={newTeamName}
                            placeholder="New team name"
                            aria-label="New team name"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" type="submit">Create New team</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>

            </Row>
            <Row>
                {renderTeamCards()}
            </Row>
        </Container>
    )
}