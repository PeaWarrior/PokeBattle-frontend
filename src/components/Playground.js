import React, { useState, useEffect, useRef } from 'react';
import BattleListings from './battle/BattleListings';
import OnlineUsersList from './user/OnlineUsersList';
import { Container, Row, Col } from 'react-bootstrap';

import consumer from '../Cable';

const URL = 'http://localhost:3001/';

export default function Playground(props) {
    const { username } = props;
    const [onlineUsers, setOnlineUsers] = useState([]);

    const ws = useRef(null);

    useEffect(() => {
        fetch(`${URL}users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setOnlineUsers(onlineUsers => ([
                ...onlineUsers,
                ...data
            ]))
        })
    }, [])

    useEffect(() => {
        ws.current = consumer.subscriptions.create({
            channel: "UserChannel",
            username: username
        },
        {
            connected: () => console.log('CONNECTED!!'),
            disconnected: () => console.log("DISCONNECTED FROM BATTLE"),
        })
        return () => {
            ws.current.unsubscribe();
        }
    }, [username])

    useEffect(() => {
        ws.current.received = (data) => {
            if (data.active) {
                const loggedInUser = onlineUsers.find(onlineUser => onlineUser.id === data.id)
                if (!loggedInUser) {
                    setOnlineUsers(onlineUsers => ([
                        ...onlineUsers,
                        data
                    ]))
                }
            } else {
                const updatedOnlineUsers = onlineUsers.filter(onlineUser => (onlineUser.id !== data.id))

                setOnlineUsers(onlineUsers => updatedOnlineUsers);
            }
        }
    });


    return (
        <Container className="card">
            <Row>

                <Col md={3} className="card">
                    <OnlineUsersList onlineUsers={onlineUsers} />
                </Col>
                <Col md={9} className="card">
                    <BattleListings {...props} />
                </Col>
            </Row>
        </Container>
    )
}