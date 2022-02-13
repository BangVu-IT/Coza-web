import React, { useContext, useEffect, useState } from 'react'
import { productController } from '../../../controller/ProductController';
import { Brand, Color, Product, ProductLine, ProductWithDetail, Size } from '../../../model/Product';
import { Context } from '../../../store/ProductContext';
import HomeWareHouse from './HomeWareHouse';
import { toast } from 'react-toastify';

export function ListProduct() {
    const { updateProductItem, idProductItem, changeDisableInput } = useContext(Context);
    const [data, setData] = useState<ProductWithDetail[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [productUpdate, setProductUpdate] = useState<ProductWithDetail>({
        id: "",
        name: "",
        imageProduct: "",
        brandId: "",
        brand: "",
        gender: "male",
        createdAt: "",
        updatedAt: "",
        sold: 0,
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

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        changeDisableInput(false);
        setProductUpdate({
            id: "",
            name: "",
            imageProduct: "",
            brandId: "",
            brand: "",
            gender: "male",
            createdAt: "",
            updatedAt: "",
            sold: 0,
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
    const handleOpen = () => {
        setOpen(true);
    }

    const [openModalItem, setOpenModalItem] = useState(false);
    const handleCloseModalItem = () => {
        setOpenModalItem(false);
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
    const handleOpenModelItem = () => setOpenModalItem(true);

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
    }, [page, inputSearch, category, priceValue1, priceValue2, gender, sortPrice])

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
            toast.success("Update successfully", {
                position: 'bottom-left',
                autoClose: 1500
            })
            handleClose();

        } else {
            productController.addProduct(product).then(res => {
                getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
            })
            toast.success("Add successfully", {
                position: 'bottom-left',
                autoClose: 1500
            })
            handleClose();
        }
    }

    const getProductId = (id: string) => {
        setProductItemId(id);
    }

    const onAddProductItem = (productItem: Product) => {
        let idItem, idItem2;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == productItem.productId) {                
                for (let j = 0; j < data[i].productItem.length; j++) {
                    if (data[i].productItem[j].colorId == productItem.colorId && data[i].productItem[j].sizeId == productItem.sizeId) {
                        idItem = data[i].productItem[j].productItemId
                    }
                }
            }
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == productItemId) {
                for (let j = 0; j < data[i].productItem.length; j++) {
                    if (data[i].productItem[j].colorId == productItem.colorId && data[i].productItem[j].sizeId == productItem.sizeId) {
                        idItem2 = data[i].productItem[j].productItemId
                    }
                }
            }
        }

        if (productItem.productItemId !== "") {
            if (idItem == productItem.productItemId) {
                productController.updateProductItem(productItem).then(res => {
                    getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
                })
                toast.success("Update successfully", {
                    position: 'bottom-left',
                    autoClose: 1500
                })
                handleCloseModalItem();
            } else {                
                toast.error("Can't fix due to duplicate product!", {
                    position: 'bottom-left',
                    autoClose: 1500
                })
            }

        } else {
            if (idItem2 != undefined) {                
                toast.error("Product already exists!", {
                    position: 'bottom-left',
                    autoClose: 1500
                })
            } else {
                productController.addProductItem(productItem, productItemId).then(res => {
                    getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
                })
                toast.success("Add successfully", {
                    position: 'bottom-left',
                    autoClose: 1500
                })
                handleCloseModalItem();
            }
        }
    }

    const onUpdate = (product: ProductWithDetail) => {
        setProductUpdate(product)
    }

    const onDelete = (id: string) => {
        productController.deleteProduct(id).then(res => {
            getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
        });
        toast.success("Delete successfully", {
            position: 'bottom-left',
            autoClose: 1500
        })
    }

    const onDeleteProductItem = (idProduct: string) => {
        productController.deleteProductItem(idProduct, idProductItem).then(res => {
            getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
        })        
    }

    return (
        <div>
            <HomeWareHouse status={open} handleClose={handleClose} handleOpen={handleOpen} openModalItem={openModalItem} handleCloseModalItem={handleCloseModalItem} handleOpenModelItem={handleOpenModelItem} product={data} brand={brand} color={color} size={size} onAdd={onAdd} onUpdate={onUpdate} newProductUpdate={productUpdate} onDelete={onDelete} onAddProductItem={onAddProductItem} getProductId={getProductId} pageCount={pageCount} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} onDeleteProductItem={onDeleteProductItem} />
        </div>
    )
}