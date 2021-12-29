import React, { useEffect, useState } from 'react'
import { Order } from '../../model/Order';
import ListOrder from './ListOrder';
import './Order.css';
import { productController } from '../../controller/ProductController';
import { Link } from 'react-router-dom';

export default function OrderProduct() {

    const [data, setData] = useState<Order[]>([]);

    useEffect(() => {
        productController.listOrder().then(res => {
            setData(res);            
        })
    }, [])

    console.log(data);
    
    return (
        data.length != 0 ?
        <div className="order-container">
            {
                data.map(item => (
                    <ListOrder dataOrder={item} />
                ))
            }
        </div>
        :
        <div className="orders-is-empty">
            <div className="image-empty-orders">
                <img src="https://beemall.io/search.png" alt="" />
            </div>
            <div className="title-empty-orders">
                <h5>Bạn chưa đặt đơn hàng nào!</h5>
            </div>
            <div className="desc-empty-orders">
                <p>Hãy tìm những sản phẩm phù hợp với bạn và đặt mua ngay nào!</p>
            </div>
            <Link to='/' className="btn-keep-buying-orders">
                <button>Mua hàng ngay!</button>
            </Link>
        </div>
    )
}
