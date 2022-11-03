import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import UseApi from "./api";

const Profile = () => {
    const api = UseApi()
    const [user, setUser] = useState()
    useEffect(() => {
        (async () => {
                const response = await api.get('/api/profile/data')
                setUser(response.data)
            }
        )()
    }, [])
    return (
        <p>
            {JSON.stringify(user,null,2)}
            <Link to={'/'}>
                <button>Home</button>
            </Link>
        </p>
    );
};

export default Profile;