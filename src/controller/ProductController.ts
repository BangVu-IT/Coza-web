import axios from "axios";
import { Cart } from "../model/Cart";
import { Order } from "../model/Order";
import { Product } from "../model/Product";

class ProductController {

    async listCart(): Promise<Product[]> {
        return axios.get('http://localhost:5000/')
            .then(res => {
                return res.data;
            })
    }
  
    async listHome(page: number, search: string, pagesize: number) {
        return axios.post('http://localhost:5000/products/', {page, search, pagesize})
            .then(res => {             
                return res.data;
            })
    }

    async delete(id: String): Promise<Product[]> {
        return axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async add(product: Product): Promise<Product[]> {
        return axios.post('http://localhost:5000/add/', product)
            .then(res => {
                return res.data;
            })
    }

    async update(product: Product): Promise<Product[]> {
        return axios.put(`http://localhost:5000/update/${product.id}`, product)
            .then(res => {
                return res.data;
            })
    }

    async search(inputSearch: String): Promise<Product[]> {
        return axios.get(`http://localhost:5000/search/${inputSearch}`)
            .then(res => {
                return res.data;
            })
    }

    async productDetails(id: String): Promise<Product> {
        return axios.get(`http://localhost:5000/product/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async delivery(dataOrder:Order) {
        return axios.post('http://localhost:5000/checkout/delivery', {dataOrder})
    }

    async listOrder() {
        return axios.get('http://localhost:5000/orders')
            .then(res => {
                return res.data;
            })
    }
    
}

export const productController = new ProductController();