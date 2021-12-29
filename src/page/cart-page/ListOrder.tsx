import React, { useState } from 'react'

export default function ListOrder() {
    return (
        <div className="item-list-product">
            <div className="input-information">
                <div className="order-time">
                    17:07 28/12/2021
                </div>
                <div className="basic-information">
                    C.S.K G.H fdsaf (fsafsafsa), fsafa fsafa, dfsfsaf, fsafasfaf
                </div>
            </div>
            <div className="product-information">
                <div className="image-product">
                    <img src="https://cdn3.dhht.vn/wp-content/uploads/2017/07/AE-1200WHD-1AVDF-399x399.jpg" alt="" />
                </div>
                <div className="name-product">
                    Casio AE-1200WHD-1AVDF – Nam – Kính Nhựa – Quartz (Pin) – Dây Kim Loại
                </div>
                <div className="quantily">
                    x1
                </div>
                <div className="price-product">
                    20.000.000 đ
                </div>
            </div>
            <div className="total-money">
                <div className="estimated-cost">
                    20.000.000 đ
                </div>
                <div className="into-money">
                    20.000.000 đ
                </div>
            </div>
        </div>
    )
}
