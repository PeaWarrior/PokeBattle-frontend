import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
export default function Home(props) {
    const history = useHistory();
    useEffect(() => {
        if (props.id) {
            history.push({
                pathname: '/teams'
            }, []);
        }
    }, [props.id])
    return (
        <div className="backgroundFormDiv">
        </div>
    )
};