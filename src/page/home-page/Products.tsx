import React from 'react';
import { Link } from 'react-router-dom';
import { ProductWithDetail } from '../../model/Product';

interface Props {
    product: ProductWithDetail;
}

export default function Products(props: Props) {
    let priceArray = [];
    for (let i = 0; i < props.product.productItem.length; i++) {
        priceArray.push(props.product.productItem[i].price)
    }
    let minPrice = Math.min(...priceArray)
    let maxPrice = Math.max(...priceArray)

    return (
        <div className="product">
            <div className="product-img">
                <Link to={`/product/${props.product.id}`}>
                    <img src={props.product.imageProduct} alt="" />
                </Link>
            </div>

            <div className="product-information">
                <div className="product-name">               
                    <Link to={`/product/${props.product.id}`}>{props.product.name.length == props.product.name.substring(0, 50).length ? props.product.name.substring(0, 50) : props.product.name.substring(0, 50) + "..."}</Link>
                </div>
                {
                    props.product.productItem.length > 1 ?
                        <div className="product-price">
                            <span className='currency-unit'>$</span>{minPrice} - <span className='currency-unit'>$</span>{maxPrice}
                        </div>
                        :
                        <div className="product-price">
                            <span className='currency-unit'>$</span>{minPrice}
                        </div>
                }
                <div className="product-brand">
                    <u><i>{props.product.brand}</i></u>
                </div>
            </div>
        </div>
    )
}
