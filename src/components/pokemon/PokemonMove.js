import React, { useState } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function PokemonMove(move) {
    const { name, accuracy, types, power, priority, text, damage } = move;
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <small className={`moveFont pokemonMove text-capitalize ${types}`} onClick={handleShow}>
          {name}
        </small>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h5 closeButton className="text-capitalize">{name}</h5>
          </Modal.Header>
          <Modal.Body>
              <div className="d-flex">
                <small className={`badge mr-1 ${types}`}>{types}</small>
                <small>{damage === 'physical' ? 
                    <i class="fas fa-bahai"></i> 
                    : 
                    <i class="fas fa-bullseye"></i> 
                }</small>
            </div>
            <small className="mr-5">Power: {power}</small>
            <br/>
            <p>{text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }