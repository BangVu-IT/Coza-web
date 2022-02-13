import React, { useContext, useEffect } from 'react'
import { OrderWithDetail } from '../../model/Order'

interface Props {
    dataOrder: OrderWithDetail
}

export default function ListOrder(props: Props) {
    let itemProduct = props.dataOrder.orderProducts;
    let estimatedCost = 0;
    for (let i = 0; i < itemProduct.length; i++) {
        estimatedCost += itemProduct[i].price * itemProduct[i].quantity
    }
    let timeOrder = new Date(props.dataOrder.createdAt);

    return (
        <div>
            <div className="item-list-product">
                <div className="input-information">
                    <div className="order-time">
                        <div className="order-time-info">
                            {timeOrder.toLocaleString()}
                        </div>

                        <div className="border-left-status-order"></div>
                        
                        <div className="order-status-info">
                            {props.dataOrder.orderStatus}
                        </div>
                    </div>
                    <div className="basic-information">
                        {props.dataOrder.fullName}, {props.dataOrder.phoneNumber}, {props.dataOrder.email}, {props.dataOrder.address}, {props.dataOrder.postCode}
                    </div>
                </div>

                {
                    props.dataOrder.orderProducts.map((item, index) => (
                        <div className="product-information-order-user">
                            <div className="image-product">
                                <img src={item.product?.image} alt="" />
                            </div>
                            <div className="name-quantity-information">
                                <div className="name-product">
                                    {item.name}
                                </div>
                                <div className="color-size-product-info-order-history">
                                    ({item.product?.color}, {item.product?.size})
                                </div>
                                <div className="quantity">
                                    <i>(x{item.product?.quantity})</i>
                                </div>
                            </div>
                            <div className="price-product">
                                ${item.price}
                            </div>
                        </div>
                    ))
                }

                <div className="total-money">
                    <div className="estimated-cost">
                        <span className="title-estimated-cost">Estimated cost: </span> <span className="value-estimated-cost">${estimatedCost}</span>
                    </div>
                    <div className="into-money">
                        <span className="title-into-money">Total: </span> <span className="value-into-money">
                            ${estimatedCost}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
