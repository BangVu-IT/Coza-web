import React, { useContext, useEffect, useState } from 'react'
import { productController } from '../../../controller/ProductController';
import { Brand, Color, Product, ProductLine, ProductWithDetail, Size } from '../../../model/Product';
import { Context } from '../../../store/ProductContext';
import HomeWareHouse from './HomeWareHouse'

export function ListProduct() {
    const { updateProductItem, productItem } = useContext(Context);
    const [data, setData] = useState<ProductWithDetail[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [productUpdate, setProductUpdate] = useState<ProductWithDetail>({
        id: "",
        name: "",
        imageProduct: "",
        brandId: "",
        brand: "",
        gender: "",
        createdAt: "",
        updatedAt: "",
        productItem: [{
            productItemId: "",
            productId: "",
            image: "",
            colorId: "",
            color: "",
            sizeId: "",
            size: "",
            price: 0,
            quantity: 0
        }]
    });
    const [brand, setBrand] = useState<Brand[]>([]);
    const [color, setColor] = useState<Color[]>([]);
    const [size, setSize] = useState<Size[]>([]);
    const [productItemId, setProductItemId] = useState("");
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState("");
    const [category, setCategory] = useState("");
    const [priceValue1, setPriceValue1] = useState(0);
    const [priceValue2, setPriceValue2] = useState(1000000);
    const [gender, setGender] = useState("");
    const [sortPrice, setSortPrice] = useState("");

    useEffect(() => {
        productController.productBrandList().then(res => {
            setBrand(res)
        })
            .then(res => {
                productController.productColorList().then(res => {
                    setColor(res)
                })
            })
            .then(res => {
                productController.productSizeList().then(res => {
                    setSize(res)
                })
            })
    }, [])

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        getList(newPage, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
    };

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setPage(1);
        getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
    };

    useEffect(() => {
        getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
    }, [])

    const getList = (page: number, inputSearch: string, rowsPerPage: number, category: string, priceValue1: number, priceValue2: number, gender: string, sortPrice: string) => {
        productController.productList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice).then(res => {
            setData(res.productListAll)
            setPageCount(res.pageNumberProduct);
        })
    }

    const onAdd = (product: any) => {
        if (productUpdate.id !== "") {
            productController.updateProduct(product).then(res => {
                getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
            })
        } else {
            productController.addProduct(product).then(res => {
                getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
            })
        }
        setProductUpdate({
            id: "",
            name: "",
            imageProduct: "",
            brandId: "",
            brand: "",
            gender: "",
            createdAt: "",
            updatedAt: "",
            productItem: [{
                productItemId: "",
                productId: "",
                image: "",
                colorId: "",
                color: "",
                sizeId: "",
                size: "",
                price: 0,
                quantity: 0
            }]
        })
    }

    const getProductId = (id: string) => {
        setProductItemId(id);
    }

    const onAddProductItem = (productItem: Product) => {        
        if (productItem.productItemId !== "") {
            productController.updateProductItem(productItem).then(res => {
                getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
            })
        } else {
            productController.addProductItem(productItem, productItemId).then(res => {
                getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
            })            
        }
        updateProductItem({
            productItemId: "",
            productId: "",
            image: "",
            colorId: "",
            color: "",
            sizeId: "",
            size: "",
            price: 0,
            quantity: 0
        })
    }    

    const onUpdate = (product: ProductWithDetail) => {
        setProductUpdate(product)
    }

    const onDelete = (id: string) => {
        productController.deleteProduct(id).then(res => {
            getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
        });
    }

    const onDeleteProductItem = (idProduct: string, idProductItem: string) => {
        productController.deleteProductItem(idProduct, idProductItem).then(res => {
            getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
        })
    }

    return (
        <div>
            <HomeWareHouse product={data} brand={brand} color={color} size={size} onAdd={onAdd} onUpdate={onUpdate} newProductUpdate={productUpdate} onDelete={onDelete} onAddProductItem={onAddProductItem} getProductId={getProductId} pageCount={pageCount} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} onDeleteProductItem={onDeleteProductItem} />
        </div>
    )
}
