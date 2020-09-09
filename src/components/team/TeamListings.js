import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import NewTeamForm from './NewTeamForm'
import { Container, Row, Col } from 'react-bootstrap';

const URL = 'http://localhost:3001/'

export default function TeamListings() {
    const [teams, setTeams] = useState([]);
    const [errors, setErrors] = useState('');

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

    const createNewTeam = (newTeamName) => {
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
                setErrors(...data.error)
            } else {
                setTeams([...teams, data])
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

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <NewTeamForm createNewTeam={createNewTeam} errors={errors} />
                </Col>
            </Row>
            <Row>
                {teams.length ? 
                    renderTeamCards()
                    :
                    <Container>
                        <p className="pt-5">You currently have no teams.</p>
                    </Container>
                }
            </Row>
        </Container>
    )
}