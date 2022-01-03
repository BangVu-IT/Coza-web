import React from 'react'
import { Order } from '../../model/Order'

interface Props {
    dataOrder: Order
}

export default function ListOrder(props: Props) {
    return (
        <div className="item-list-product">
            <div className="input-information">
                <div className="order-time">
                    {props.dataOrder.createat}
                </div>
                <div className="basic-information">
                    {props.dataOrder.fullname}, {props.dataOrder.phonenumber}, {props.dataOrder.email}, {props.dataOrder.address}, {props.dataOrder.postcode}
                </div>
            </div>
            <div className="product-information">
                <div className="image-product">
                    <img src={props.dataOrder.image} alt="" />
                </div>
                <div className="name-quantily-information">
                    <div className="name-product">
                        {props.dataOrder.name}
                    </div>
                    <div className="quantily">
                        (x{props.dataOrder.quantity})
                    </div>
                </div>
                <div className="price-product">
                    {props.dataOrder.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                </div>
            </div>
            <div className="total-money">
                <div className="estimated-cost">
                    <span className="title-estimated-cost">Estimated cost: </span> <span className="value-estimated-cost">{(props.dataOrder.price * props.dataOrder.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                </div>
                <div className="into-money">
                    <span className="title-into-money">Total: </span> <span className="value-into-money">
                        {(props.dataOrder.price * props.dataOrder.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                    </span>
                </div>
            </div>
        </div>
    )
}
