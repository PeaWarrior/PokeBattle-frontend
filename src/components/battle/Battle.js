import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Battle(props) {
    const location = useLocation();

    console.log(location.state)
    return (
        <div>

        </div>
    )
}