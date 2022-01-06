import React, { useEffect, useState } from 'react';
import { Product } from '../../model/Product';
import './WareHouse.css';
import FormInput from './FormInput';
import WareHouseProduct from './WareHouseProduct';
import { productController } from '../../controller/ProductController';

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
    const [pageSize, setPageSize] = useState<number>(3);
    const [inputSearch, setInputSearch] = useState<string>();

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

    const onRemove = async (id: string) => {
        productController.delete(id).then(res => {
            setValue(res);
        });
    }

    const onAdd = (product: Product) => {
        if (data.id != '') {                        
            productController.update(product).then(res => {
                setValue(res);
            });
        } else {            
            productController.add(product).then(res => {
                setValue(res);
            });                       
        }        
        setData({ id: '', image: '', name: '', brand: '', price: 0 })
    }

    const onUpdate = (product: Product) => {
        setData({ ...product });
    }   

    return (
        <div className="container-chung">
            <FormInput onAdd={onAdd} product={data} />
            <WareHouseProduct key={uuidv4} product={value} onRemove={onRemove} onUpdate={onUpdate} onPageNumber={onPageNumber} countPage={pageCount} nextPage={nextPage} prePage={prePage} onSearch={onSearch} pageLimit={indexPage == 1 ? "page-limit" : ""} pageLimitTop={indexPage == pageCount.length ? "page-limit-top" : ""} pageIndex={indexPage} />            
        </div>
    )
}
