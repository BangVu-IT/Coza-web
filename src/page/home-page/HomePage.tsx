import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import Slide from './Slide';
import ProductComponent from './ProductComponent';
import { Product } from '../../model/Product';
import { productController } from '../../controller/ProductController';
import { useNavigate } from "react-router-dom";
import { Context } from '../../store/Provider';
import { CartContext } from '../../store/CartProvider';

export default function HomePage() {
    const [value, setValue] = useState<Product[]>([]);
    const [pageCount, setpageCount] = useState<[]>([]);
    const [indexPage, setIndexPage] = useState<number>(1);    
    const [inputSearch, setInputSearch] = useState<string>();
    const pageSize = 4;
    const navigate = useNavigate();

    const { changeUsername, userId, changeUserId } = useContext(Context);
    const { cartNumber } = useContext(CartContext);

    useEffect(() => {
        productController.getMe().then(res => {
            changeUsername(res.data.userName);
            changeUserId(res.data.user_id)
        })
    }, [])

    useEffect(() => {
        productController.getListCart(userId).then(res => {            
            cartNumber(res.length)            
        })
    }, [userId])

    useEffect(() => {
        productController.listHome(1, "", pageSize).then(res => {
            setValue(res.arrProduct);
            setpageCount(res.arrPageNumber);
        })
    }, [])

    const onproductDetails = (id: String) => {
        navigate(`/product/${id}`);
    }

    const onPageNumber = (page: number) => {
        if (inputSearch != undefined) {
            productController.listHome(page, String(inputSearch), pageSize).then(res => {
                setValue(res.arrProduct);
                setpageCount(res.arrPageNumber);
                setIndexPage(page);
            })
        }else {
            productController.listHome(page, "", pageSize).then(res => {
                setValue(res.arrProduct);
                setpageCount(res.arrPageNumber);
                setIndexPage(page);
            })
        }
    }

    const onSearch = (keyWord: string) => {
        if (keyWord != "") {
            productController.listHome(1, keyWord, pageSize).then(res => {
                setValue(res.arrProduct);
                setpageCount(res.arrPageNumber);
                setIndexPage(1);
                setInputSearch(keyWord);
            })
        } else {
            productController.listHome(1, "", pageSize).then(res => {
                setValue(res.arrProduct);
                setpageCount(res.arrPageNumber);
                setIndexPage(1);
                setInputSearch(keyWord);
            })
        }
    }

    const nextPage = () => {          
        if (indexPage < pageCount.length) {
            onPageNumber(indexPage + 1);
            setIndexPage(indexPage + 1);
        }
    }

    const prePage = () => {
        if (indexPage > 1) {
            onPageNumber(indexPage - 1);
            setIndexPage(indexPage - 1);            
        }
    }

    return (
        <div>
            <Slide />            
            <ProductComponent product={value} onProductDetails={onproductDetails} onPageNumber={onPageNumber} countPage={pageCount} nextPage={nextPage} prePage={prePage} onSearch={onSearch} pageLimit={indexPage == 1 ? "page-limit" : ""} pageLimitTop={indexPage == pageCount.length ? "page-limit-top" : ""} pageIndex={indexPage} />
        </div>
    )
}
