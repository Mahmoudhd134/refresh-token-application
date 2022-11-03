import axios from "axios";
import {useContext, useEffect} from "react";
import UserContext from "./Constext";

const api = axios.create({
    baseURL: 'https://localhost:7201',
    headers: {
        'Content-Type': 'application/json'
    }
})

const UseApi = () => {
    const {token, setToken} = useContext(UserContext)

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(config => {
            if (config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`
            }

            return config
        }, error => Promise.reject(error))

        const responseIntercept = api.interceptors.response.use(res => res, async error => {
            // debugger
            const originalRequest = error.config
            if (error.response && error.response.status === 401 && !originalRequest.retry) {
                originalRequest.retry = true
                console.log('getting refresh token')
                const refreshToken = await api.get<{ token: string }>('/api/authentication/refreshToken',
                    {
                        withCredentials: true
                    })
                console.log('refresh token is gotten')
                console.log({old: token, new: refreshToken.data.token})
                setToken(refreshToken.data.token)
                originalRequest.headers['Authorization'] = `Bearer ${refreshToken.data.token}`
                return api(originalRequest)
            }
            return Promise.reject(error)
        })

        return () => {
            api.interceptors.request.eject(requestIntercept)
            api.interceptors.response.eject(responseIntercept)
        }
    }, [])

    return api
};

export default UseApi;