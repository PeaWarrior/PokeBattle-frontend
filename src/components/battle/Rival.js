import React from 'react';
import { ProgressBar } from 'react-bootstrap'

export default function Rival(rivalActive) {

    return (
        <div className="battleDiv d-flex">
            <div className="hpBarDiv">
                <div className="hpBar">
                    <h5>{rivalActive.nickname ? rivalActive.nickname : <br/>}</h5>
                    <ProgressBar variant="success" now={rivalActive.hp/rivalActive.maxhp * 100} />
                    <br/>
                </div>
            </div>
            <div className="spriteDiv">
                <img className="rivalSprite" src={rivalActive.sprite} alt="" />
            </div>
        </div>
    )
}