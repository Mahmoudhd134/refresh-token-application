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
    // const {token, setToken} = useContext(UserContext)
    // let t: string | null = null

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(config => {
            if (config.headers) {
                // this code throw an DOMException error
                // config.headers['Authorization'] = `Bearer ${token}`

                // this does not throw the exception
                config['headers'] = {
                    ...config["headers"],
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': `application/json`
                }
                // console.log(`sending access token is ${t ?? token}`)
                // console.log(t)
                // t = null
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
                // console.log({old: token, new: refreshToken.data.token})
                // setToken(refreshToken.data.token)
                // originalRequest.headers['Authorization'] = `Bearer ${refreshToken.data.token}`
                // t = refreshToken.data.token
                localStorage.setItem('token',refreshToken.data.token)

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
