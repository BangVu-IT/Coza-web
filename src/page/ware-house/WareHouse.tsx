import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../../model/Product';
import './WareHouse.css';
import FormInput from './FormInput';
import WareHouseProduct from './WareHouseProduct';
import { productController } from '../../controller/ProductController';
import { Context } from '../../store/Provider';
import { CartContext } from '../../store/CartProvider';

const { v4: uuidv4 } = require('uuid');

export default function WareHouse() {
    const [value, setValue] = useState<Product[]>([]);
    const [data, setData] = useState<Product>({
        id: '',
        image: '',
        name: '',
        brand: '',
        price: 0,
    });
    const [pageCount, setpageCount] = useState<[]>([]);
    const [indexPage, setIndexPage] = useState<number>(1);    
    const pageSize = 3;
    const [inputSearch, setInputSearch] = useState<string>();
    const { changeUsername } = useContext(Context);
    const { cartNumber } = useContext(CartContext);

    useEffect(() => {
        productController.getMe().then(res => {
            changeUsername(res.data.userName)
        })
    }, [])

    useEffect(() => {
        productController.getListCart("1").then(res => {              
            cartNumber(res.length)         
        })
    }, [])

    useEffect(() => {
        productController.listHome(1, "", pageSize).then(res => {
            setValue(res.arrProduct);
            setpageCount(res.arrPageNumber);
        })
    }, [])

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

    const onRemove = (id: string) => {
        productController.delete(id)
        productController.listHome(1, "", pageSize).then(res => {
            setValue(res.arrProduct);
            setpageCount(res.arrPageNumber);
            setIndexPage(1);
        })
    }

    const onAdd = (product: Product) => {        
        if (data.id != '') {            
            productController.update(product, 1, "", pageSize).then(res => {
                setValue(res.arrProduct);
                setIndexPage(1);
            });
        } else {
            productController.add(product, 1, "", pageSize).then(res => {
                setValue(res.arrProduct);
                setpageCount(res.arrPageNumber);
                setIndexPage(1);
            });
        }
        setData({ id: '', image: '', name: '', brand: '', price: 0 })
    }

    const onUpdate = (product: Product) => {
        setData({ ...product });
    }

    return (
        <div className="container-chung">
            <FormInput key={Math.random()} onAdd={onAdd} product={data} />
            <WareHouseProduct key={uuidv4} product={value} onRemove={onRemove} onUpdate={onUpdate} onPageNumber={onPageNumber} countPage={pageCount} nextPage={nextPage} prePage={prePage} onSearch={onSearch} pageLimit={indexPage == 1 ? "page-limit" : ""} pageLimitTop={indexPage == pageCount.length ? "page-limit-top" : ""} pageIndex={indexPage} />
        </div>
    )
}
