import React, { useState, useEffect } from 'react';
import BattleCard from './BattleCard';
import NewBattleRoom from './NewBattleRoom'
import { Container, Row, Col } from 'react-bootstrap';
import consumer from '../../Cable';

const URL = 'http://localhost:3001/'

export default function BattleListings(props) {
    const { username } = props;
    const [battles, setBattles] = useState([]);

    useEffect(() => {
        const subscription = consumer.subscriptions.create({
            channel: "BattleListingsChannel",
            username: username,
        },
        {
            received: data => {
                setBattles([...battles, data])
            },
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [username, battles]);

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
        return battles.map(battle => (
            <Col md={6} className="mb-3" key={battle.id}>
                <BattleCard {...battle} />
            </Col>
        ))
    }

    return (
        <Container className="battleListing regCard">
            <div className="mb-3">
                <NewBattleRoom />
            </div>
            <hr/>
            <Row>
                {renderBattleCards()}
            </Row>
        </Container>
    )
}