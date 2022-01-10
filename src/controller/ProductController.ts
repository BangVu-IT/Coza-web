import axios from "axios";
import { setToken } from ".";
import { Product } from "../model/Product";
import { User } from "../model/User";

class ProductController {    

    async listHome(page: number, search: string, pagesize: number) {
        return setToken.post('/products/', { page, search, pagesize })
            .then(res => {
                return res.data;
            })
    }

    async delete(id: String) {
        return setToken.delete(`/delete/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async add(product: Product, page: number, search: string, pagesize: number) {
        return setToken.post('/add/', { product, page, search, pagesize })
            .then(res => {
                return res.data;
            })
    }

    async update(product: Product, page: number, search: string, pagesize: number) {
        return setToken.put(`/update/${product.id}`, { product, page, search, pagesize })
            .then(res => {
                return res.data;
            })
    }

    async productDetails(id: String): Promise<Product> {
        return setToken.get(`/product/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async delivery(dataOrder: User, idOrder: string) {
        return setToken.post('/checkout/delivery', { dataOrder, idOrder })
    }

    async listOrder(page: number, pagesize: number) {
        return setToken.post('/orders', { page, pagesize })
            .then(res => {
                return res.data;
            })
    }

    async orderProduct(id: string, quantity: number, price: number) {
        return setToken.post(`/carts/${id}`, { quantity, price })
    }

    async getListCart(userId: string) {
        return setToken.post(`/checkout/cart/`, { userId })
            .then(res => {
                return res.data;
            })
    }

    async setReductionQuantity(idCart: string) {
        return setToken.get(`/cart/reduction/${idCart}`)
            .then(res => {
                return res.data;
            })
    }

    async setIncreaseQuantity(idCart: string) {
        return setToken.get(`/cart/increase/${idCart}`)
            .then(res => {
                return res.data;
            })
    }

    async deleteCartProduct(id: string) {
        return setToken.delete(`/cart/item/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async login(user: object) {
        return axios.post(`http://localhost:5000/users/login`, user)
            .then(res => {
                return res;
            })
    }

    async getMe() {
        return setToken.get(`/get-me`)
            .then(res => {
                return res;
            })
    }

}

export const productController = new ProductController();