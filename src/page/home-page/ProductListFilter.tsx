import React from 'react';
import { ProductWithDetail } from '../../model/Product';
import Products from './Products';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
    product: ProductWithDetail[];
    pageCount: number;
    page: number;
    handleChange: any;
    search: string;
    onSetGenderValue: (gender: string) => void;
    onSetSortPrice: (sortPriceValue: string) => void;
}

export default function ProductListFilter(props: Props) {

    const setGender = (e: any) => {
        props.onSetGenderValue(e.target.value)
    }

    const setSortPrice = (e: any) => {
        props.onSetSortPrice(e.target.value)
    }

    return (
        <div className="container-right-item-product-search-list">
            <div style={{ display: props.search != "" ? "block" : "none" }} className="title-result-search-product">
                Search results for keyword <span style={{ color: "#9C26B0" }}>'{props.search}'</span>
            </div>

            <div className="sort-product-item">
                <div className="title-sort-item-product">
                    Sort by
                </div>

                <div className="sort-product-by-gender">
                    <select name="" onChange={e => setGender(e)}>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="sort-product-by-price">
                    <select name="" onChange={e => setSortPrice(e)}>
                        <option value="">Price</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="product-list-filter-by-user">
                {props.product.map((item, index) => <Products key={index} product={item} />)}
            </div>

            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5} style={{ margin: "40px 0" }}>

                <div className="product-pagination">
                    <Pagination count={props.pageCount} page={props.page} onChange={props.handleChange} />
                </div>
            </Stack>
        </div>
    );
}
