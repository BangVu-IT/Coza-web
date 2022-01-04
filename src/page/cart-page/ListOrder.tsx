import React, { useState } from 'react'
import { OrderWithDetail } from '../../model/Order'
import { OrderProduct } from '../../model/OrderProduct'


interface Props {
    dataOrder: OrderWithDetail
}

export default function ListOrder(props: Props) {
    let itemProduct: OrderProduct[] = props.dataOrder.orderProducts;
    let estimatedCost = 0;
    for (let i = 0; i < itemProduct.length; i++) {
        estimatedCost += itemProduct[i].price * itemProduct[i].quantity
    }
    return (
        <div>
            <div className="item-list-product">
                <div className="input-information">
                    <div className="order-time">
                        {props.dataOrder.createdAt}
                    </div>
                    <div className="basic-information">
                        {props.dataOrder.user.fullName}, {props.dataOrder.user.phoneNumber}, {props.dataOrder.user.email}, {props.dataOrder.user.address}, {props.dataOrder.user.postcode}
                    </div>
                </div>

                {
                    props.dataOrder.orderProducts.map(item => (
                        <div className="product-information">
                            <div className="image-product">
                                <img src={item.product?.image} alt="" />
                            </div>
                            <div className="name-quantily-information">
                                <div className="name-product">
                                    {item.product?.name}
                                </div>
                                <div className="quantily">
                                    (x{item.quantity})
                                </div>
                            </div>
                            <div className="price-product">
                                {item.product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </div>
                        </div>
                    ))
                }

                <div className="total-money">
                    <div className="estimated-cost">
                        <span className="title-estimated-cost">Estimated cost: </span> <span className="value-estimated-cost">{estimatedCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    </div>
                    <div className="into-money">
                        <span className="title-into-money">Total: </span> <span className="value-into-money">
                            {estimatedCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
