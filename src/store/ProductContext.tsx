import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from '../model/Product';

interface ContextProvider {
    children: ReactNode
}

interface ProductItemContextDefault {
    productItem: Product;
    updateProductItem: (productItem: Product) => void;
    idProductItem: string;
    changeIdProductItem: (idProductItem: string) => void;
    disableInput: boolean;
    changeDisableInput: (disableValue: boolean) => void;
}

const productItemDefault = {
    productItem: {
        productItemId: "",
        productId: "",
        image: "",
        colorId: "",
        color: "",
        sizeId: "",
        size: "",
        price: 0,
        quantity: 0
    },
    updateProductItem: () => { },
    idProductItem: "",
    changeIdProductItem: () => { },
    disableInput: false,
    changeDisableInput: () => { }
}

export const Context = createContext<ProductItemContextDefault>(productItemDefault);

export function ProductContext({ children }: ContextProvider) {

    const [productItem, setProductItem] = useState<Product>({
        productItemId: "",
        productId: "",
        image: "",
        colorId: "",
        color: "",
        sizeId: "",
        size: "",
        price: 0,
        quantity: 0
    });
    const [idProductItem, setIdProductItem] = useState("");
    const [disableInput, setDisableInput] = useState(false);

    const updateProductItem = (productItem: Product) => {
        setProductItem(productItem)
    }

    useEffect(() => {
        changeIdProductItem(idProductItem);            
    }, [idProductItem])

    const changeIdProductItem = (idProductItem: string) => {
        setIdProductItem(idProductItem)
    }

    const changeDisableInput = (disableValue: boolean) => {
        setDisableInput(disableValue)
    }

    const data = { productItem, updateProductItem, idProductItem, changeIdProductItem,
    disableInput, changeDisableInput }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}
