import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cartController } from '../controller/CartController';
import { Cart } from '../model/Cart';
import { UserCreateContext } from './UserContext';

interface ContextProvider {
    children: ReactNode
}

interface CartContextDefault {
    orderId: string;
    cartList: Cart[];
    getCartList: () => void;
}

const cartDefault = {
    orderId: "",
    cartList: [],
    getCartList: () => { }
}

export const CartCreateContext = createContext<CartContextDefault>(cartDefault);

export function CartContext({ children }: ContextProvider) {
    const { userInfo } = useContext(UserCreateContext);
    const [cartList, setCartList] = useState<Cart[]>([]);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        if (userInfo.user_id != "") {
            cartController.getListCart(userInfo.user_id).then(res => {                
                if (res.cartProducts !== undefined) {
                    setCartList(res.cartProducts)
                    setOrderId(res.orderId.order_id)
                } else {
                    setCartList([])
                    setOrderId(res.orderId.order_id)
                }
            })
        }
    }, [userInfo.user_id])

    const getCartList = () => {
        if (userInfo.user_id != "") {
            cartController.getListCart(userInfo.user_id).then(res => {
                if (res.cartProducts !== undefined) {
                    setCartList(res.cartProducts)
                    setOrderId(res.orderId.order_id)
                } else {
                    setCartList([])
                    setOrderId(res.orderId.order_id)
                }
            })
        }
    }

    const data = { orderId, cartList, getCartList }

    return (
        <CartCreateContext.Provider value={data}>
            {children}
        </CartCreateContext.Provider>
    )
}
