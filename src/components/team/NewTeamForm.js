import React, { useState } from 'react';
import { Modal, Container, Button, Form } from 'react-bootstrap';

export default function NewTeamForm(prop) {
    const { createNewTeam, errors } = prop;
    const [show, setShow] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.persist();
        event.preventDefault();
        createNewTeam(newTeamName);
        handleClose();
    };

    const handleChange = (event) => {
        setNewTeamName(event.target.value);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Create new team
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
            <Modal.Title>Create new team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Container className="d-flex flex-column justify-content-center">
                        <br/>
                        <input onChange={handleChange} value={newTeamName}
                            placeholder="Enter new team name"
                        />
                        {errors ? 
                            <span className="error">{errors}</span>
                            :
                            <br/>
                        }
                        <br/>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">Create Team</Button>
                        </Modal.Footer>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}