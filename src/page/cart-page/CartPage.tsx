import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Cart } from '../../model/Cart';
import { getDataLocal, setDataLocal } from '../../model/DataLocal';
import './CartPage.css'
import CartProduct from './CartProduct';

export default function CartPage() {

    const [value, setValue] = useState<Cart[]>(getDataLocal);

    const onReduction = (id: string) => {
        for (let i = 0; i < value.length; i++) {
            if (value[i].id == id) {
                value[i].quantily -= 1;
                setValue(value.slice());
                setDataLocal(value);
            }
            if (value[i].quantily <= 1) {
                value[i].quantily = 1;
                setValue(value.slice());
                setDataLocal(value);
            }
        }
    }

    const onIncrease = (id: string) => {
        for (let i = 0; i < value.length; i++) {
            if (value[i].id == id) {
                value[i].quantily += 1;
                setValue(value.slice())
            }
        }
        setDataLocal(value);
    }

    let totalProductMoney: number = 0;
    for (let i = 0; i < value.length; i++) {
        totalProductMoney += value[i].quantily * value[i].price;
    }

    const onRemove = (id: string) => {
        let filterCart = value.filter(item => (
            item.id != id
        ))
        setDataLocal(filterCart);
        setValue(filterCart);
    }

    return (
        <div className="cart-container">
            <div className="danh-sach-mua">
                <div className="container">
                    <div className="content">
                        <div className="item-danh-sach-mua">
                            <div className="item-danh-sach">
                            </div>
                            <div className="item-danh-sach">
                                <span>Sản phẩm</span>
                            </div>
                            <div className="item-danh-sach">
                                <span>Đơn giá</span>
                            </div>
                            <div className="item-danh-sach">
                                <span>Số lượng</span>
                            </div>
                            <div className="item-danh-sach">
                                <span>Thao tác</span>
                            </div>
                        </div>                        
                        <div id="carts" className="danh-sach-san-pham-mua">                            
                            {value.map((item, index) => <CartProduct key={index} cart={item} onReduction={onReduction} onIncrease={onIncrease} onRemove={onRemove} />)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="thanh-toan">
                <div className="item-thanh-toan">
                    <div className="title-thanh-toan">
                        Tổng đơn đặt hàng:
                    </div>
                    <div className="tong-tien">
                        <span>{totalProductMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    </div>
                </div>
                <Link to="/checkout/delivery" className="btn-order">
                    <button>Đặt hàng</button>
                </Link>
            </div>
        </div>
    )
}
