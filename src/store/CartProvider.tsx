import React, { createContext, ReactNode, useState } from 'react';

interface ContextProvider {
    children: ReactNode
}

interface CartContextDefault {    
    cartNumber: (numberProduct: number) => void
    productNumberCart: number
}

const progressDefault = {    
    cartNumber: () => {},
    productNumberCart: 0
}

export const CartContext = createContext<CartContextDefault>(progressDefault);

export function CartProvider({ children }: ContextProvider) {
    
    const [productNumberCart, setProductNumberCart] = useState(0);   

    const cartNumber = (numberProduct: number) => {
        setProductNumberCart(numberProduct);
    }

    const data = { productNumberCart, cartNumber }

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}
