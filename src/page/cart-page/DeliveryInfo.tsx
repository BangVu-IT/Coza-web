import React from 'react';
import { Cart } from '../../model/Cart';

interface Props {
    cartList: Cart;
}

export default function DeliveryInfo(props: Props) {
    return (
        <div className="product-list-delivery-info">
            <div className="product-name-delivery">
                {props.cartList.name}
            </div>

            <div className="product-color-size-delivery">
                ({props.cartList.color}, {props.cartList.size}) <span style={{marginLeft: "5px"}}>x{props.cartList.quantity}</span>
            </div>
            
            <div className="price-delivery">
                <div className="title-price-product-delivery">
                    Price
                </div>
                <div className="price-product-delivery">
                    ${props.cartList.price * props.cartList.quantity}
                </div>
            </div>

            {/* <div className="delivery-cost">
                <div className="title-delivery-cost">
                    Delivery
                </div>
                <div className="delivery-cost-product">
                    $2
                </div>
            </div> */}
        </div>
    )
}
