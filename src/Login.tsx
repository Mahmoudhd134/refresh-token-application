import React, {useContext, useRef} from 'react'
import useApi from "./api";
import {Link} from "react-router-dom";
import UserContext from "./Constext";

function App() {
    const api = useApi()
    // const {setToken} = useContext(UserContext)
    const username = useRef() as React.MutableRefObject<HTMLInputElement>
    const password = useRef() as React.MutableRefObject<HTMLInputElement>

    const singIn = async (e: React.FormEvent) => {
        e.preventDefault()
        const loginModule = {
            username: username.current.value,
            password: password.current.value
        }
        try {
            const response = await api.post<{ token: string, roles: string[] }>('/api/authentication/login', JSON.stringify(loginModule), {
                withCredentials: true
            })
            // setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
        } catch (error) {

        }
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
