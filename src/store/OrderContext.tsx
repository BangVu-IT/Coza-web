import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cartController } from '../controller/CartController';
import { Cart } from '../model/Cart';
import { UserCreateContext } from './UserContext';

interface ContextProvider {
    children: ReactNode
}

interface OrderContext {
    onSetStatus: (orderStatus: string) => void;
    orderStatus: string;
}

const orderDefault = {
    onSetStatus: () => {},
    orderStatus: ""
}

export const orderCreateContext = createContext<OrderContext>(orderDefault);

export function OrderContext({ children }: ContextProvider) {
    const [orderStatus, setOrderStatus] = useState("");   

    // useEffect(() => {
    //     onSetStatus()
    // }, [])

    const onSetStatus = (orderStatus: string) => {
        setOrderStatus(orderStatus)
    }

    const data = { orderStatus, onSetStatus }

    return (
        <orderCreateContext.Provider value={data}>
            {children}
        </orderCreateContext.Provider>
    )
}
