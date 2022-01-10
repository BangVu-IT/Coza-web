import React, { createContext, ReactNode, useState } from 'react';

interface ContextProvider {
    children: ReactNode
}

interface UserContextDefault {
    userName: string;
    changeUsername: (name: string) => void;
    userId: string;
    changeUserId: (id: string) => void;
}

const progressDefault = {
    userName: "",
    changeUsername: () => {},
    userId: "",
    changeUserId: () => {}
}

export const Context = createContext<UserContextDefault>(progressDefault);

export function Provider({ children }: ContextProvider) {

    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");  

    const changeUsername = (name: string) => {
        setUserName(name);
    }   

    const changeUserId = (id: string) => {
        setUserId(id);
    }  

    const data = { userName, changeUsername, userId, changeUserId }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}
