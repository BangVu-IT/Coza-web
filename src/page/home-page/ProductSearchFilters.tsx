import React, { useEffect, useState } from 'react';
import { GoPrimitiveDot } from "react-icons/go";
import { Brand } from '../../model/Product';

interface Props {
    brand: Brand[];
    onSetPriceValue: (priceValue: any) => void;
    onSetCategory: (categoryValue: string) => void;
    onSetAllCategory: (categoryValue: string) => void;
    onClearAll: () => void;
    categoryValue: string;
    priceValueInput1: string;
    priceValueInput2: string;
}

export default function ProductSearchFilters(props: Props) {
    const [priceValue, setPriceValue] = useState({
        value1: 0,
        value2: 1000000
    })
    const [priceValueInput, setPriceValueInput] = useState({
        priceValueInput1: props.priceValueInput1,
        priceValueInput2: props.priceValueInput2
    })
    const [brandValue, setBrandValue] = useState(props.categoryValue)

    useEffect(() => {
        setBrandValue(props.categoryValue)
        setPriceValueInput({...priceValueInput, priceValueInput1: props.priceValueInput1})
        setPriceValueInput({...priceValueInput, priceValueInput2: props.priceValueInput2})
    }, [props.categoryValue, props.priceValueInput1, props.priceValueInput2])

    const setCategoryProduct = (e: any) => {
        props.onSetCategory(e.target.value)
        setBrandValue(e.target.value)
    }

    const setAllCategoryProduct = (e: any) => {
        props.onSetAllCategory(e.target.value)
        setBrandValue(e.target.value)
    }
    
    return (
        <div className="container-left-item-product-search-list">
            <div className="brand-product-title">
                SEARCH FILTER
            </div>

            <div className="category-item-product">
                <div className="title-by-category">
                    Brands
                </div>
                <div className="brand-list-item-product">
                    <div className="brand-name-product">
                        <GoPrimitiveDot /><button value={""} style={{color: brandValue == "" ? "#717FE1" : "#000000"}} onClick={e => setAllCategoryProduct(e)}>All Brands</button>
                    </div>
                    {
                        props.brand.map((item, index) => (
                            <div key={index} className="brand-name-product">
                                <GoPrimitiveDot /><button style={{color: brandValue == item.brand_id ? "#717FE1" : "#000000"}} value={item.brand_id} onClick={e => setCategoryProduct(e)}>{item.brand}</button>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="border-bottom-item-filter"></div>

            <div className="price-range-item-product">
                <div className="title-by-price-range">
                    Price Range
                </div>
                <div className="price-range-product-filter">
                    <div className="price-range-product">
                        <input onChange={e => setPriceValue({...priceValue, value1: Number(e.target.value)})} type="number" placeholder='$ MIN' min={0} defaultValue={priceValueInput.priceValueInput1} />
                    </div>
                    
                    <div className="space-price-range"> - </div>

                    <div className="price-range-product">
                        <input onChange={e => setPriceValue({...priceValue, value2: Number(e.target.value)})} type="number" placeholder='$ MAX' min={0} defaultValue={priceValueInput.priceValueInput2} />
                    </div>
                </div>
                <div className="price-range-product-btn-apply">
                    <button onClick={() => props.onSetPriceValue(priceValue)}>APPLY</button>
                </div>
            </div>

            <div className="border-bottom-item-filter"></div>

            <div className="delete-search-filter-btn">
                <button onClick={props.onClearAll}>CLEAR ALL</button>
            </div>
        </div>
    );
}
