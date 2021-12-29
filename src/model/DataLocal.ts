import { Cart } from "./Cart";

export const getDataLocal = () => {
    let localProducts = []
    let localProduct = localStorage.getItem('CartProduct')
    if (localProduct != null) {
        localProducts = JSON.parse(localProduct)
    }
    return localProducts;
}

export const setDataLocal = (product: Cart[]) => {
    localStorage.setItem('CartProduct', JSON.stringify(product));
}