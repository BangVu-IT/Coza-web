import React from 'react'
import { Cart } from '../../model/Cart';
import { MdOutlineDelete } from 'react-icons/md';

interface Props {
    cartProduct: Cart;
    onReduction: (cartId: string) => void;
    onIncrease: (cartId: string, idProductItem: string) => void;
    onDeleteCartProduct: (cartId: string) => void;
};

export default function CartProduct(props: Props) {
    return (
        <div>
            <div className="border-bottom-cart-product"></div>
            <div className="san-pham-mua">
                <div className="anh-sp-mua item-sp">
                    <img src={props.cartProduct.image} alt="" />
                </div>
                <div className="ten-sp-mua item-sp">
                    <span style={{color: "#555655", fontWeight: "500", fontSize: "15px", lineHeight: "20px"}}>{props.cartProduct.name}</span>
                    <div className='product-color-size-info'>
                        <span style={{fontSize: "14px", fontWeight: "380", color: "#555655"}}>({props.cartProduct.color}, {props.cartProduct.size})</span>
                    </div>
                </div>
                <div className="gia-sp-mua item-sp">
                    <span style={{fontSize: "16px", fontWeight: "400", color: "#555655"}}>$ {props.cartProduct.price}</span>
                </div>
                <div className="so-luong item-sp">                    
                    <button onClick={() => props.onReduction(props.cartProduct.cart_id)} className='btn-fa-minus'><i className="fas fa-minus"></i></button>
                    <button className="btn-hien-thi-so-luong">{props.cartProduct.quantity}</button>
                    <button onClick={() => props.onIncrease(props.cartProduct.cart_id, props.cartProduct.product_item_id)} className='btn-fa-plus'><i className="fas fa-plus"></i></button>
                </div>
                <div className="thao-tac item-sp">
                    <MdOutlineDelete onClick={() => props.onDeleteCartProduct(props.cartProduct.cart_id)} fontSize={24} color='#637381' />
                </div>
            </div>
        </div>

    )
}
