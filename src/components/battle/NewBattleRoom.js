import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TeamCard from '../team/TeamCard';
import { Button, Modal } from 'react-bootstrap';

const URL = 'http://localhost:3001/';

export default function NewBattleRoom(props) {
    const { currentUserId, toJoin, status, id } = props;
    const history = useHistory();
    const [show, setShow] = useState(false);

    const [roomName, setRoomName] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeRoomName = (event) => {
        setRoomName(event.target.value);
    }

    console.log(props)
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

    const handleSubmit = (event) => {
        event.preventDefault();
        toJoin ? handleSubmitJoinRoom() : handleSubmitCreateRoom() 
    }

    const handleSubmitCreateRoom = () => {
        fetch(`${URL}battles`, {
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
            handleClose();
            history.push({
                pathname: '/battle',
                state: {
                    currentUserId: currentUserId,
                    battleId: data.id
                }
            });
        })
    }

    const handleSubmitJoinRoom = () => {
        fetch(`${URL}join`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                battle: {
                    id: id,
                    team_index: selectedTeam
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            handleClose();
            history.push({
                pathname: '/battle',
                state: {
                    currentUserId: currentUserId,
                    battleId: id
                }
            });
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
        
        <Button variant="primary" onClick={handleShow} disabled={status === 'full' ? true : false}>
            {status === 'full' ? 'Room Full' : (toJoin ? 'Join Room' : 'Create Room')}
        </Button>
    
  
        <Modal show={show} onHide={handleClose} size={'xl'}>
          <Modal.Header closeButton>
            <Modal.Title>{toJoin ? 'Join Room' : 'Create Room'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
              <form onSubmit={handleSubmit}>
                  {toJoin ?
                    null
                    :
                    <label>
                      Room Name
                      <br/>
                      <input onChange={handleChangeRoomName} type="text" name="roomName" value={roomName} />
                    </label>
                  }
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
                        {status === 'full' ? null : (toJoin ? 'Join Room' : 'Create Room')}
                    </Button>
                </Modal.Footer>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }