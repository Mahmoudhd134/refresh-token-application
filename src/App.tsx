import React, {useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import UserContext from './Constext'

const App = () => {
    const [token, setToken] = useState<string | null>(null)
    return (
        <div>
            <UserContext.Provider value={{token, setToken}}>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={(
                            <>
                                <Link to={'/login'}>
                                    <button>Login</button>
                                </Link>

                                <Link to={'/profile'}>
                                    <button>Profile</button>
                                </Link>
                            </>
                        )}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/profile'} element={<Profile/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
};

export default App;