import React, { useContext, useEffect, useState } from 'react';
import './CartPage.css'
import CartProduct from './CartProduct';
import Button from '@mui/material/Button';
import { CartCreateContext } from '../../store/CartContext';
import { cartController } from '../../controller/CartController';
import { Link } from 'react-router-dom';
import cartEmpty from '../../img/search.png';
import { toast } from 'react-toastify';

export default function CartPage() {
    const { cartList, getCartList } = useContext(CartCreateContext)

    useEffect(() => {
        getCartList();
    }, [])

    const onReduction = (cartId: string) => {
        cartController.setReductionQuantity(cartId).then(res => {
            getCartList();
        })
    }

    const onIncrease = (cartId: string, idProductItem: string) => {
        cartController.setIncreaseQuantity(cartId, idProductItem).then(res => {
            getCartList();
        })
    }

    const onDeleteCartProduct = (cartId: string) => {
        cartController.deleteCartProduct(cartId).then(res => {
            getCartList();
        })
        toast.success("Successful delete!", {
            position: 'bottom-left',
            autoClose: 1500
        })
    }

    return (
        cartList.length != 0 ?
            <div className="cart-container">
                <div className="danh-sach-mua">
                    <div className="container">
                        <div className="content">
                            <div className="item-danh-sach-mua">
                                <div className="item-danh-sach">
                                </div>
                                <div className="item-danh-sach">
                                    <span>PRODUCT</span>
                                </div>
                                <div className="item-danh-sach">
                                    <span>PRICE</span>
                                </div>
                                <div className="item-danh-sach">
                                    <span>QUANTITY</span>
                                </div>
                                <div className="item-danh-sach">
                                    <span>ACTION</span>
                                </div>
                            </div>
                            <div id="carts" className="danh-sach-san-pham-mua">
                                {
                                    cartList.map((item, index) => (
                                        <CartProduct key={index} cartProduct={item} onReduction={onReduction} onIncrease={onIncrease} onDeleteCartProduct={onDeleteCartProduct} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thanh-toan">
                    <div className="item-thanh-toan">
                        <div className="title-thanh-toan">
                            Total order: {cartList.length}
                        </div>
                    </div>
                    <div className="btn-order">
                        <Link to="/checkout/delivery"><Button variant="contained">CONTINUE TO CHECKOUT</Button></Link>
                    </div>
                </div>
            </div>
            :
            <div className="cart-is-empty">
                <div className="image-empty-cart">
                    <img src={cartEmpty} alt="" />
                </div>
                <div className="title-empty-cart">
                    <h5>Cart is empty!</h5>
                </div>
                <div className="desc-empty-cart">
                    <p>Please add products to cart before make the payment!</p>
                </div>
                <Link to='/' className="btn-keep-buying">
                    <Button variant="contained">Shop now!</Button>
                </Link>
            </div>
    )
}
