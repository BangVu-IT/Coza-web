import React from 'react'
import { Cart } from '../../model/Cart';
import { Product } from '../../model/Product';

interface Props {
    cart: Cart;
    // onProductDetails: () => void;
    onReduction: (id: string) => void;
    onIncrease: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function CartProduct(props: Props) {
    return (
        <div>
            <hr />
            <div className="san-pham-mua">
                <div className="anh-sp-mua item-sp">
                    <img src={props.cart.image} alt="" />
                </div>
                <div className="ten-sp-mua item-sp">
                    <span>{props.cart.name}</span>
                </div>
                <div className="gia-sp-mua item-sp">
                    <span>{props.cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
                </div>
                <div className="so-luong item-sp">
                    <button onClick={() => props.onReduction(props.cart.id)}><i className="fas fa-minus"></i></button>
                    <button className="btn-hien-thi-so-luong">{props.cart.quantily}</button>
                    <button onClick={() => props.onIncrease(props.cart.id)}><i className="fas fa-plus"></i></button>
                </div>
                <div onClick={() => props.onRemove(props.cart.id)} className="thao-tac item-sp">
                    <i className="fas fa-trash" />
                </div>
            </div>
        </div>

    )
}
