import axios from "axios";
import { setToken } from ".";
import { Product, ProductWithDetail } from "../model/Product";

class ProductController {    

    async productList(page: number, inputSearch: string, rowsPerPage: number, category: string, priceValue1: number, priceValue2: number, gender: string, sortPrice: string) {
        return setToken.post('/products/', { page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice })
            .then(res => {
                return res.data;
            })
    }

    async productBrandList() {
        return setToken.get('/brand/list')
            .then(res => {
                return res.data;
            })
    }

    async productColorList() {
        return setToken.get('/color/list')
            .then(res => {
                return res.data;
            })
    }

    async productSizeList() {
        return setToken.get('/size/list')
            .then(res => {
                return res.data;
            })
    }

    async addProduct(product: any) {
        return setToken.post('/add', { product })
            .then(res => {
                return res.data;
            })
    }

    async addProductItem(productItem: Product, productId: string) {
        return setToken.post('/add/product-item', { productItem, productId })
            .then(res => {
                return res.data;
            })
    }

    async updateProduct(product: ProductWithDetail) {
        return setToken.put(`/update/${product.id}`, { product })
            .then(res => {
                return res.data;
            })
    }

    async updateProductItem(productItem: Product) {
        return setToken.put(`/update/product-item/${productItem.productItemId}`, { productItem })
            .then(res => {
                return res.data;
            })
    }

    async deleteProduct(id: String) {
        return setToken.delete(`/delete/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async deleteProductItem(idProduct: string, idProductItem: string) {
        return setToken.delete(`/delete/product-item/${idProduct}/${idProductItem}`)
            .then(res => {
                return res.data;
            })
    }

    async productDetails(id: String): Promise<ProductWithDetail> {
        return setToken.get(`/product/${id}`)
            .then(res => {
                return res.data;
            })
    }

}

export const productController = new ProductController();