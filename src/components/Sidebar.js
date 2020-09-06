import React, { useState, useEffect } from 'react';
import Team from './Team';

export default function Sidebar(currentUser) {
    const { username, team } = currentUser
    // const [username, setUsername] = useState(currentUser.username);
    // const [team, setTeam] = useState(currentUser.team);

    // useEffect(() => {
    //     currentUser.username ? setUsername(currentUser.username) : setUsername(null)
    // }, [currentUser])

    // useEffect(() => {
    //     currentUser.team ? setTeam(currentUser.team) : setTeam(null)
    // },[currentUser.team])

    const SidebarStyle = {
        border: '1px solid black',
        height: '100%'
    }

    return (
        <div style={SidebarStyle}>
            <h1>{username}</h1>
            <Team {...team} />
        </div>
    )
}