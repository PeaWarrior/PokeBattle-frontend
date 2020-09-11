import React from 'react';
import { Button, Col } from 'react-bootstrap';

export default function BattleMove(move) {
    const { handleClickFight, moveIndex, name } = move;

    const handleClick = (event) => {
        handleClickFight(moveIndex);
    }

    return (
        <Col md={6}>
            <Button 
                onClick={handleClick}
                variant="light" 
                className="text-capitalize battleMove" 
            >
                {name}
            </Button>
        </Col>
    )
}