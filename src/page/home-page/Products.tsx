import React from 'react'
import { Product } from '../../model/Product';

interface Props {
    product: Product;
    onProductDetails: () => void;
};

export default function Products(props:Props) {
    return (
        <div className="san-pham" onClick={props.onProductDetails}>
            <div className="anh-san-pham">
                <img src={props.product.image} alt="" />
            </div>
            <div className="thong-tin-sp">
                <div className="ten-san-pham">
                    {props.product.name}
                </div>
                <div className="hang-san-pham">
                    {props.product.brance}
                </div>
                <div className="gia-san-pham">
                    {props.product.price} <span><u>đ</u></span>
                </div>
                <div className="them-vao-gio">
                    <button className="btn-san-pham">THÊM VÀO GIỎ</button>
                </div>
            </div>
        </div>
    )
}
