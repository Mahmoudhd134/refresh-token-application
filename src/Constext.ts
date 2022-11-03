import React, {createContext, SetStateAction} from "react";

const UserContext = createContext<{
    token: string | null,
    setToken: React.Dispatch<SetStateAction<string | null>>
}>({
    token: null,
    setToken: () => null
})

export default UserContext