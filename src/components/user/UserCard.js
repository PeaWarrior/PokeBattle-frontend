import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function UserCard({ username }) {

    return (
        

        <Container>
            <Row className="userCard">
                <Col xs={9}>
                    <span>{username}</span>
                </Col>
                <Col xs={3}>
                    <span style={{color: 'green'}}><i className="fas fa-signal"></i></span>
                </Col>
            </Row>
        </Container>
    );
};