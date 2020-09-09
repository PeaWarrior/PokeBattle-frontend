import React, { useState, useEffect } from 'react';
import BattleListings from './battle/BattleListings';
import OnlineUsersList from './user/OnlineUsersList';
import { Container, Row, Col } from 'react-bootstrap';

import consumer from '../Cable';

const URL = 'http://localhost:3001/';

export default function Playground(props) {
    const { username } = props;
    const [onlineUsers, setOnlineUsers] = useState([]);

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
        if (username) {
            const subscription = consumer.subscriptions.create({
                channel: "UserChannel",
                username: username,
            },
            {
                disconnected: () => setOnlineUsers([]),
                received: data => {
                    if (!data.active) {
                        setOnlineUsers(onlineUsers => {
                            const updatedOnlineUsers = onlineUsers.filter(onlineUser => onlineUser.username !== data.username);
                            return (updatedOnlineUsers);
                        });
                    } else {
                        setOnlineUsers(onlineUsers => ([
                            ...onlineUsers,
                            data
                        ]))
                    }
                },
            })
            return () => {
                subscription.unsubscribe();
            }
        }

    }, [username]);

    return (
        <Container className="card">
            <Row>

                <Col md={3} className="card">
                    <OnlineUsersList onlineUsers={onlineUsers} />
                </Col>
                <Col md={9} className="card">
                    <BattleListings />
                </Col>
            </Row>
        </Container>
    )
}