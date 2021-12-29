import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { productController } from '../../controller/ProductController';
import { getDataLocal } from '../../model/DataLocal';
import { Cart, Order } from '../../model/Order';
import './Delivery.css';

export default function Delivery() {

    const [dataCart, setDataCart] = useState<Cart[]>(getDataLocal);    
    const [dataOrder, setdataOrder] = useState<Order>({
        idOrder: String(Math.random()),
        createdAt: Date.now(),
        fullname: "",
        phonenumber: 0,
        email: "",
        address: "",
        postcode: "",
        cart: {
            id: "",
            image: "",
            name: "",            
            price: 0,
            quantily: 0
        }
    });

    const Purchase = () => {
        let dataProductCart: Order;
        for (let i = 0; i < dataCart.length; i++) {
            dataProductCart = {
                idOrder: String(Math.random()),
                createdAt: Date.now(),
                fullname: dataOrder.fullname,
                phonenumber: dataOrder.phonenumber,
                email: dataOrder.email,
                address: dataOrder.address,
                postcode: dataOrder.postcode,
                cart: dataCart[i]
            }
            productController.delivery(dataProductCart)
        }
    }


    return (
        <div className="container-form-dang-ki">
            <div className="form-dang-ki">
                <div className="showcase-1">
                    <h1 className="title-form-dang-ki">Mua hàng</h1>
                    <div className="form-showcase">
                        <label>Họ tên</label>
                        <input type="text" className="btn" onChange={e => { setdataOrder({ ...dataOrder, fullname: e.target.value }) }} />
                        <label>Số điện thoại</label>
                        <input type="number" className="btn" onChange={e => { setdataOrder({ ...dataOrder, phonenumber: Number(e.target.value) }) }} />
                        <label>Email</label>
                        <input type="email" className="btn" onChange={e => { setdataOrder({ ...dataOrder, email: e.target.value }) }} />
                        <label>Địa chỉ</label>
                        <input type="text" className="btn" onChange={e => { setdataOrder({ ...dataOrder, address: e.target.value }) }} />
                        <label>Mã bưu điện</label>
                        <input type="text" className="btn" onChange={e => { setdataOrder({ ...dataOrder, postcode: e.target.value }) }} />
                        <Link to="/user/orders">
                            <button onClick={Purchase} className="btn-primary">Mua hàng</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
