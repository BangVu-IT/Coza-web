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
        brance: '',
        price: 0,
    });

    useEffect(() => {
        productController.listCart().then(res => {
            setValue(res);
        })
    }, [])

    const onRemove = (id: string) => {
        productController.delete(id).then(res => {
            setValue(res);
        })
    }

    const onAdd = (product: Product) => {        
        if (data.id != '') {
            productController.update(product).then(res => {                
                setValue(res);
            })
        } else {
            productController.add(product).then(res => {
                setValue(res);
            })
        }
        setData({ id: '', image: '', name: '', brance: '', price: 0 })
    }

    const onUpdate = (product: Product) => {        
        setData({ ...product });
    }
    
    const onSearch = (inputValue: string) => {        
        productController.search(inputValue).then(res => {
            setValue(res);
        })
    }
    
    return (
        <div className="container-chung">
            <FormInput key={uuidv4()} onAdd={onAdd} product={data} />
            <WareHouseProduct product={value} onRemove={onRemove} onUpdate={onUpdate} onSearch={onSearch} />)
        </div>
    )
}
