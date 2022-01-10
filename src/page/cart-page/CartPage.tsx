import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productController } from '../../controller/ProductController';
import './CartPage.css'
import CartProduct from './CartProduct';
import { useNavigate } from "react-router-dom";
import { Cart } from '../../model/Cart';
import { CartContext } from '../../store/CartProvider';
import { Context } from '../../store/Provider';

export default function CartPage() {
    const [value, setValue] = useState<Cart[]>([]);    
    const navigate = useNavigate();
    const { cartNumber } = useContext(CartContext);
    const { changeUsername, userId, changeUserId } = useContext(Context);

    useEffect(() => {
        productController.getMe().then(res => {
            changeUsername(res.data.userName)
            changeUserId(res.data.user_id)
        })
    }, [])    

    useEffect(() => {
        productController.getListCart(userId).then(res => {
            setValue(res);   
            cartNumber(res.length)         
        })
    }, [userId])

    const onReduction = (id: string) => {
        productController.setReductionQuantity(id).then(res => {
            productController.getListCart(userId).then(res => {            
                setValue(res);
            })
        })        
    }

    const onIncrease = (id: string) => {
        productController.setIncreaseQuantity(id).then(res => {
            productController.getListCart(userId).then(res => {            
                setValue(res);
            })
        })
    }

    let totalProductMoney: number = 0;
    for (let i = 0; i < value.length; i++) {
        totalProductMoney += value[i].quantity * value[i].price;
    }

    const onRemove = (id: string) => {
        productController.deleteCartProduct(id).then(res => {
            productController.getListCart(userId).then(res => {
                setValue(res);
                cartNumber(res.length);
            })
        })
    }

    const onDelivery = () => {
        navigate(`/checkout/delivery/${value[0].order_id}`);
    }
            
    return (
        value.length != 0 ? 
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
                <div onClick={onDelivery} className="btn-order">
                    <button>Đặt hàng</button>
                </div>
            </div>
        </div>
        :
        <div className="cart-is-empty">
            <div className="image-empty-cart">
                <img src="https://beemall.io/search.png" alt="" />
            </div>
            <div className="title-empty-cart">
                <h5>Giỏ hàng trống!</h5>
            </div>
            <div className="desc-empty-cart">
                <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán!</p>
            </div>
            <Link to='/' className="btn-keep-buying">
                <button>Tiếp tục mua hàng!</button>
            </Link>
        </div>
    )
}
