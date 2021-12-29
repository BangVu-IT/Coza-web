import React, { useEffect, useState } from 'react'
import { Order } from '../../model/Order';
import ListOrder from './ListOrder';
import './Order.css';
import { productController } from '../../controller/ProductController';

export default function OrderProduct() {

    const [data, setData] = useState<Order[]>([]);

    useEffect(() => {
        productController.listOrder().then(res => {
            setData(res);            
        })
    }, [])

    console.log(data);
    
    return (
        <div className="order-container">
            {
                data.map(item => (
                    <ListOrder dataOrder={item} />
                ))
            }
        </div>
    )
}
