import React from 'react';
import pokeballBlack from '../../images/pokeballBlack.png';
import pokeballOnline from '../../images/pokeballOnline.png';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function BattleCard(props) {
    const { room_name, red_user_name, status } = props;
    const history = useHistory();

    const handleClickJoin = () => {
        history.push({
            pathname: '/battle',
            state: {...props}
          })
    }

    return (
        <Container className="regCard">
            <div>
                <h5>{room_name}</h5>
            </div>
            <hr className="divider"/>
            <div className="d-flex justify-content-between">
                <span>Host: {red_user_name}</span>
                    {status === "open" ?
                        <div >
                            <img style={{width: '20px'}}src={pokeballOnline} alt="" />
                            <img style={{width: '20px'}} src={pokeballBlack} alt="" />
                        </div>
                        :
                        <span>Full</span>
                    }
            </div>
            <p></p>
            <div className="d-flex flex-row-reverse">
                <Button onClick={handleClickJoin}>Join</Button>
            </div>
        </Container>
    )
}