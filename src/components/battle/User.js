import React from 'react';
import { ProgressBar } from 'react-bootstrap'

export default function User(userActive) {

    return (
        <div className="battleDiv d-flex flex-row-reverse">
            <div className="hpBarDiv">
                <div className="hpBar">
                    <h5>{userActive.nickname ? userActive.nickname : <br/>}</h5>
                    <ProgressBar variant="success" now={userActive.hp/userActive.maxhp * 100}/>
                    <div className="d-flex flex-row-reverse">
                        <span>{userActive.hp ? `${userActive.hp}/${userActive.maxhp}` : <br/>}</span>
                    </div>
                </div>
            </div>
            <div className="spriteDiv">
                <img className="userSprite" src={userActive.sprite} alt="" />
            </div>
        </div>
    )
}