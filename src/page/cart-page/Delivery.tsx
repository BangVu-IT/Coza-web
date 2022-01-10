import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productController } from '../../controller/ProductController';
import { User } from '../../model/User';
import { CartContext } from '../../store/CartProvider';
import { Context } from '../../store/Provider';
import './Delivery.css';
const { v4: uuidv4 } = require('uuid');

export default function Delivery() {
    const [dataUser, setDataUser] = useState<User>({
        id: "",
        fullName: "",
        phoneNumber: 0,
        email: "",
        address: "",
        postcode: "",
    });    
    const { idOrder } = useParams();
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

    const Purchase = () => {
        let userInformation: User;
        userInformation = {
            id: uuidv4(),
            fullName: dataUser.fullName,
            phoneNumber: dataUser.phoneNumber,
            email: dataUser.email,
            address: dataUser.address,
            postcode: dataUser.postcode,
        };
        productController.delivery(userInformation, String(idOrder))
    }

    return (
        <div className="container-form-dang-ki">
            <div className="form-dang-ki">
                <div className="showcase-1">
                    <h1 className="title-form-dang-ki">Mua hàng</h1>
                    <div className="form-showcase">
                        <label>Họ tên</label>
                        <input type="text" className="btn" onChange={e => { setDataUser({ ...dataUser, fullName: e.target.value }) }} />
                        <label>Số điện thoại</label>
                        <input type="number" className="btn" onChange={e => { setDataUser({ ...dataUser, phoneNumber: Number(e.target.value) }) }} />
                        <label>Email</label>
                        <input type="email" className="btn" onChange={e => { setDataUser({ ...dataUser, email: e.target.value }) }} />
                        <label>Địa chỉ</label>
                        <input type="text" className="btn" onChange={e => { setDataUser({ ...dataUser, address: e.target.value }) }} />
                        <label>Mã bưu điện</label>
                        <input type="text" className="btn" onChange={e => { setDataUser({ ...dataUser, postcode: e.target.value }) }} />
                        <Link to="/user/orders">
                            <button onClick={Purchase} className="btn-primary">Mua hàng</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
