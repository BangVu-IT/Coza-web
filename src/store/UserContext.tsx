import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { userController } from '../controller/UserController';
import { User } from '../model/User';

interface ContextProvider {
    children: ReactNode
}

interface UserContextDefault {
    userInfo: User;
    changeUserInfo: () => void;
}

const userDefault = {
    userInfo: {
        user_id: "",
        full_name: "",
        phone_number: "",
        email: "",
        address: "",
        post_code: ""
    },
    changeUserInfo: () => { }
}

export const UserCreateContext = createContext<UserContextDefault>(userDefault);

export function UserContext({ children }: ContextProvider) {

    const [userInfo, setUserInfo] = useState<User>({
        user_id: "",
        full_name: "",
        phone_number: "",
        email: "",
        address: "",
        post_code: ""
    });

    useEffect(() => {
        userController.getMe().then(res => {
            if (res != undefined) {
                setUserInfo(res)
            } else {
                setUserInfo({
                    user_id: "",
                    full_name: "",
                    phone_number: "",
                    email: "",
                    address: "",
                    post_code: ""
                })
            }
        })
    }, [])

    const changeUserInfo = () => {
        userController.getMe().then(res => {
            if (res != undefined) {
                setUserInfo(res)
            } else {
                setUserInfo({
                    user_id: "",
                    full_name: "",
                    phone_number: "",
                    email: "",
                    address: "",
                    post_code: ""
                })
            }
        })
    }

    const data = { userInfo, changeUserInfo }

    return (
        <UserCreateContext.Provider value={data}>
            {children}
        </UserCreateContext.Provider>
    )
}
