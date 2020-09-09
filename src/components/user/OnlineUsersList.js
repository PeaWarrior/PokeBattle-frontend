import React from 'react';
import UserCard from './UserCard';

export default function OnlineUsersList({onlineUsers}) {

    const renderOnlineUserCards = () => {
        return onlineUsers.map(onlineUser => <UserCard key={onlineUser.username} {...onlineUser} />)
    };

    return (
        <div className="battleListing">
            <div>
                <h5>Currently Online:</h5>
                <hr/>
            </div>
            {renderOnlineUserCards()}
        </div>
    )
}