import React, { useEffect, useState } from 'react';
import { productController } from '../../controller/ProductController';
import { ProductWithDetail } from '../../model/Product';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Products from './Products';
import './Products.css';

export default function ProductListHome() {
    const [data, setData] = useState<ProductWithDetail[]>([]);
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const rowsPerPage = 8;
    const [category, setCategory] = useState("");
    const [priceValue1, setPriceValue1] = useState(0);
    const [priceValue2, setPriceValue2] = useState(1000000);
    const [gender, setGender] = useState("");
    const [sortPrice, setSortPrice] = useState("");

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getList(value, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
    };

    useEffect(() => {
        getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
    }, [])

    const getList = (page: number, inputSearch: string, rowsPerPage: number, category: string, priceValue1: number, priceValue2: number, gender: string, sortPrice: string) => {
        productController.productList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice).then(res => {
            setData(res.productListAll)
            setPageCount(Math.ceil(res.pageNumberProduct / rowsPerPage))
        })
    }
    
    return (
        <div className='product-list-container'>
            <div className="product-filter-title-item">
                <div className="product-overview-title">
                    <h4>PRODUCT OVERVIEW</h4>
                </div>
            </div>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5} style={{ paddingBottom: "40px" }}>
                <div className="product-list">
                    {data.map((item, index) => <Products key={index} product={item} />)}
                </div>

                <div className="product-pagination">
                    <Pagination count={pageCount} page={page} onChange={handleChange} />
                </div>
            </Stack>
        </div>
    )
}
