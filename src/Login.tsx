import React, {useContext, useRef, useState} from 'react'
import useApi from "./api";
import {Link, Navigate} from "react-router-dom";
import UserContext from "./Constext";
import react from "@vitejs/plugin-react";

function App() {
    const api = useApi()
    const {setToken} = useContext(UserContext)
    const username = useRef() as React.MutableRefObject<HTMLInputElement>
    const password = useRef() as React.MutableRefObject<HTMLInputElement>

    const singIn = async (e: React.FormEvent) => {
        e.preventDefault()
        const loginModule = {
            username: username.current.value,
            password: password.current.value
        }

        const response = await api.post<{ token: string, roles: string[] }>('/api/authentication/login', JSON.stringify(loginModule), {
            withCredentials: true
        })

        setToken(response.data.token)

    }
    return (
        <div>
            <form onSubmit={singIn}>
                <input ref={username} type="text" placeholder={'username'} defaultValue={'Mahmoud'}/>
                <input ref={password} type="text" placeholder={'password'} defaultValue={'Mahmoud2320030@'}/>
                <button>sign in</button>
            </form>
            <Link to={'/profile'}>
                <button>Profile</button>
            </Link>
        </div>
    )
}

export default App
