import React, { useEffect, useState } from 'react';
import { productController } from '../../controller/ProductController';
import { Brand, ProductWithDetail } from '../../model/Product';
import './ProductListSearch.css';
import ProductSearchFilters from './ProductSearchFilters';
import ProductListFilter from './ProductListFilter';
import { useSearchParams } from 'react-router-dom';
import cartEmpty from '../../img/search.png';

export default function ProductListSearch() {
    const [data, setData] = useState<ProductWithDetail[]>([]);
    const [brand, setBrand] = useState<Brand[]>([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const rowsPerPage = 4;
    const [category, setCategory] = useState("");
    const [priceValue1, setPriceValue1] = useState(0);
    const [priceValue2, setPriceValue2] = useState(1000000);
    const [priceValueInput1, setPriceValueInput1] = useState("");
    const [priceValueInput2, setPriceValueInput2] = useState("");
    const [gender, setGender] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    const [searchParams] = useSearchParams();
    const inputSearch = searchParams.get('search') || "";

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getList(value, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
    };
    
    useEffect(() => {
        getList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice);
        productController.productBrandList().then(res => {
            setBrand(res)
        })
    }, [page, inputSearch, category, priceValue1, priceValue2, gender, sortPrice])

    const getList = (page: number, inputSearch: string, rowsPerPage: number, category: string, priceValue1: number, priceValue2: number, gender: string, sortPrice: string) => {
        productController.productList(page, inputSearch, rowsPerPage, category, priceValue1, priceValue2, gender, sortPrice).then(res => {
            setData(res.productListAll)
            setPageCount(Math.ceil(res.pageNumberProduct / rowsPerPage))
        })
    }

    const onSetPriceValue = (priceValue: any) => {        
        setPriceValue1(priceValue.value1)
        setPriceValue2(priceValue.value2)
    }

    const onSetCategory = (categoryValue: string) => {
        setCategory(categoryValue)
        setPage(1)
    }

    const onSetAllCategory = (categoryValue: string) => {
        setCategory(categoryValue)
        setPage(1)
    }

    const onClearAll = () => {        
        setPage(1)
        setCategory("")
        setPriceValue1(0)
        setPriceValue2(1000000)
        setGender("")
        setSortPrice("")
        setPriceValueInput1("")
        setPriceValueInput2("")
    }

    const onSetGenderValue = (gender: string) => {
        setGender(gender)
        setPage(1)
    }

    const onSetSortItemProduct = (sortPriceValue: string) => {
        setSortPrice(sortPriceValue)
        setPage(1)
    }
    
    return (
        data.length != 0 ?
            <div className="product-search-list-background">
                <div className='product-search-list'>
                    <ProductSearchFilters brand={brand} onSetPriceValue={onSetPriceValue} onSetCategory={onSetCategory} onSetAllCategory={onSetAllCategory} onClearAll={onClearAll} categoryValue={category} priceValueInput1={priceValueInput1} priceValueInput2={priceValueInput2} />
                    
                    <ProductListFilter pageCount={pageCount} page={page} handleChange={handleChange} product={data} search={inputSearch || ""} onSetGenderValue={onSetGenderValue} onSetSortItemProduct={onSetSortItemProduct} genderValue={gender} sortPriceValue={sortPrice} />
                </div>
            </div>
            :
            <div className="product-search-empty">
                <div className="cart-is-empty">
                    <div className="image-empty-cart">
                        <img src={cartEmpty} alt="" />
                    </div>
                    <div className="title-empty-cart">
                        <h5>No result is found!</h5>
                    </div>
                    <div className="desc-empty-cart">
                        <p style={{fontSize: "18px"}}>Try using more generic keywords</p>
                    </div>                   
                </div>
            </div>
    )
}
