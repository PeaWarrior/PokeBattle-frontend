import React from 'react';
import pokeballBlack from '../../images/pokeballBlack.png';
import pokeballOnline from '../../images/pokeballOnline.png';
import NewBattleRoom from './NewBattleRoom'
import { Container } from 'react-bootstrap';

export default function BattleCard(props) {
    const { room_name, currentUserId, users, status } = props;
        console.log(props)
    return (
        <Container className="regCard battle">
            <div>
                <h5>{room_name}</h5>
            </div>
            <hr className="divider"/>
            <div className="d-flex justify-content-between">
                <span>Host: {users[0].username}</span>
                    {status === "open" ?
                        <div >
                            <img style={{width: '20px'}}src={pokeballOnline} alt="" />
                            <img style={{width: '20px'}} src={pokeballBlack} alt="" />
                        </div>
                        :
                        <div>
                            <img style={{width: '20px'}}src={pokeballOnline} alt="" />
                            <img style={{width: '20px'}}src={pokeballOnline} alt="" />
                        </div>
                    }
            </div>
            <div className="d-flex flex-row-reverse">
                <NewBattleRoom toJoin={true} status={status} currentUserId={currentUserId} {...props} />
            </div>
        </Container>
    )
}