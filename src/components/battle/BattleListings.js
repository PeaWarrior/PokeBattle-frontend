import React, { useState, useEffect, useRef } from 'react';
import BattleCard from './BattleCard';
import NewBattleRoom from './NewBattleRoom'
import { Container, Row, Col } from 'react-bootstrap';
import consumer from '../../Cable';

const URL = 'http://localhost:3001/'

export default function BattleListings(props) {
    const { username, id: currentUserId } = props;
    const [battles, setBattles] = useState([]);

    const ws = useRef(null);

    useEffect(() => {
        ws.current = consumer.subscriptions.create({
            channel: "BattleListingsChannel",
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
            setBattles([...battles, data])
        }
    }, [battles]);

    useEffect(() => {
        fetch(`${URL}battles`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            // HEREHEREHRHEHREHE
            data.message ? console.log(data) : setBattles([...data])
        })
    }, [])

    const renderBattleCards = () => {
        battles.sort((battle1, battle2) => battle1.status === 'open' ? -1 : 1)
        return battles.map(battle => (
            <Col md={6} className="mb-3" key={battle.id}>
                <BattleCard currentUserId={currentUserId} {...battle} />
            </Col>
        ))
    }

    return (
        <Container className="battleListing regCard">
            <div className="mb-3">
                <NewBattleRoom toJoin={false} currentUserId={currentUserId} {...props} />
            </div>
            <hr/>
            <Row>
                {renderBattleCards()}
            </Row>
        </Container>
    )
}