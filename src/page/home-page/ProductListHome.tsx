import React, { useEffect, useState } from 'react';
import { productController } from '../../controller/ProductController';
import { ProductWithDetail } from '../../model/Product';
import Products from './Products';
import './Products.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";

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
    const [sortPrice, setSortPrice] = useState("pl2.sold desc,");
    let arrProductList: ProductWithDetail[] = [];

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
            for (let i = 0; i < res.productListAll.length; i++) {
                arrProductList.push(res.productListAll[i])
            }
            setPageCount(Math.ceil(res.pageNumberProduct / rowsPerPage))
        })
    }

    const data2 = data.slice(0, 4)
    const data3 = data.slice(4, 8)

    return (
        <div className='product-list-container'>
            <div className="product-filter-title-item">
                <div className="product-overview-title">
                    BEST SELLER
                </div>
            </div>            
            <div className='slide-show-products'>
                <Swiper
                    spaceBetween={15}
                    navigation={false}
                    slidesPerView={4}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index} className='product-list' >
                            <Products product={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    )
}
