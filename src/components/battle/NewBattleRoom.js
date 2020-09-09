import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TeamCard from '../team/TeamCard';
import { Button, Modal } from 'react-bootstrap';

const URL = 'http://localhost:3001/'

export default function NewBattleRoom(props) {
    // const history = useHistory();
    const [show, setShow] = useState(false);

    const [roomName, setRoomName] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeRoomName = (event) => {
        setRoomName(event.target.value);
    }

    useEffect(()=> {
        fetch(`${URL}teams`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => setTeams(data))
    }, [])

    const handleSubmitCreateRoom = (event) => {
      event.preventDefault();
        fetch('http://localhost:3001/battles', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                battle: {
                    room_name: roomName,
                    team_index: selectedTeam
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // history.push('/teams');
            handleClose();
            console.log(data);
        })
    }

    const handleChangeSelectedTeam = (event) => {
        setSelectedTeam(event.target.value);
    }

    const renderTeamOptions = () => {
        return teams.map((team, index) => <option value={index} key={team.id}>{team.name}</option>)
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Create Room
        </Button>
  
        <Modal show={show} onHide={handleClose} size={'xl'}>
          <Modal.Header closeButton>
            <Modal.Title>Create Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
              <form onSubmit={handleSubmitCreateRoom}>
                  <label>
                      Room Name
                      <br/>
                      <input onChange={handleChangeRoomName} type="text" name="roomName" value={roomName} />
                  </label>
                  <label>
                      Select Team
                      <br/>
                      <select onChange={handleChangeSelectedTeam}>
                        {renderTeamOptions()}
                      </select>
                  </label>
                  <TeamCard {...teams[selectedTeam]} battleTeamCard={true} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Create Room
                    </Button>
                </Modal.Footer>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }