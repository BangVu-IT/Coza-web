import axios from "axios";
import { setToken } from ".";
import { OrderProduct } from "../model/OrderProduct";

class CartController {

    async getListCart(userId: string) {
        return setToken.post(`/checkout/cart/`, { userId })
            .then(res => {
                return res.data;
            })
    }

    async addProductToCart(cartProduct: OrderProduct) {
        return setToken.post(`/add/product/cart`, { cartProduct }).then(res => {
            return res.data;
        })
    }

    async setReductionQuantity(cartId: string) {
        return setToken.get(`/cart/reduction/${cartId}`)
            .then(res => {
                return res.data;
            })
    }

    async setIncreaseQuantity(cartId: string, idProductItem: string) {
        return setToken.get(`/cart/increase/${cartId}/${idProductItem}`)
            .then(res => {
                return res.data;
            })
    }

    async deleteCartProduct(cartId: string) {
        return setToken.delete(`/delete/cart/${cartId}`)
            .then(res => {
                return res.data;
            })
    }

}

export const cartController = new CartController();