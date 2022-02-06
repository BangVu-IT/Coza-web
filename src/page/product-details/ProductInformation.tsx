import React, { Component, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Product, ProductWithDetail } from '../../model/Product';
import { productController } from '../../controller/ProductController';
import '../product-details/ProductDetails.css';
import { CartCreateContext } from '../../store/CartContext';
import { cartController } from '../../controller/CartController';
import { OrderProduct } from '../../model/OrderProduct';

export default function ProductInformation() {
    const { orderId, getCartList } = useContext(CartCreateContext);
    const [data, setData] = useState<ProductWithDetail>({
        id: "",
        name: "",
        imageProduct: "",
        brandId: "",
        brand: "",
        gender: "",
        createdAt: "",
        updatedAt: "",
        productItem: [{
            productItemId: "",
            productId: "",
            image: "",
            colorId: "",
            color: "",
            sizeId: "",
            size: "",
            price: 0,
            quantity: 0
        }]
    });
    const { idProduct } = useParams();
    const [colorValue, setColorValue] = useState("");
    const [sizeValue, setSizeValue] = useState("");
    const [currentPrice, setCurrentPrice] = useState(data.productItem[0].price);
    const [currentSizeValue, setCurrentSizeValue] = useState<any[]>([]);
    const [quantity, setQuantity] = useState(1);
    let productFilterSize: any[] = [];

    useEffect(() => {
        productController.productDetails(String(idProduct)).then(res => {
            setData(res);
            setCurrentPrice(res.productItem[0].price);
            for (let i = 0; i < res.productItem.length; i++) {
                productFilterSize.push({
                    sizeId: res.productItem[i].sizeId,
                    size: res.productItem[i].size
                })
            }

            productFilterSize = productFilterSize.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.sizeId === value.sizeId && t.size === value.size
                ))
            )

            setCurrentSizeValue(productFilterSize);
        })
    }, [])

    let imageData = [];
    imageData.push(data.imageProduct);
    let filterImageProduct = data.productItem.filter(item => (
        item.image != data.imageProduct
    ))
    filterImageProduct.map(item => (
        imageData.push(item.image)
    ))

    const getColorValue = (e: any) => {
        setColorValue(e.target.value)
        setSizeValue("")
        setQuantity(1);
    }

    const getSizeValue = (e: any) => {
        setSizeValue(e.target.value)
    }

    useEffect(() => {
        let productFilterSizeByColor: Product[] = [];
        for (let i = 0; i < data.productItem.length; i++) {
            if (data.productItem[i].colorId == colorValue && data.productItem[i].quantity > 0) {
                productFilterSizeByColor.push(data.productItem[i])
            }
        }
        setCurrentSizeValue(productFilterSizeByColor)
    }, [colorValue])

    // filter product color
    let productFilterColor = [];
    for (let i = 0; i < data.productItem.length; i++) {
        productFilterColor.push({
            colorId: data.productItem[i].colorId,
            color: data.productItem[i].color
        })
    }
    productFilterColor = productFilterColor.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.colorId === value.colorId && t.color === value.color
        ))
    )

    useEffect(() => {
        for (let i = 0; i < data.productItem.length; i++) {
            if (data.productItem[i].sizeId == sizeValue && data.productItem[i].colorId == colorValue) {
                setCurrentPrice(data.productItem[i].price)
            }
        }
    }, [sizeValue])

    let quantityProductItem = 0;
    for (let i = 0; i < data.productItem.length; i++) {
        if (data.productItem[i].sizeId == sizeValue && data.productItem[i].colorId == colorValue) {
            quantityProductItem = data.productItem[i].quantity;
        }
    }    

    const productReductionQuantity = () => {        
        setQuantity(quantity - 1)
        if (quantity <= 1) {
            setQuantity(1)
        }
    }

    const productIncreaseQuantity = () => {        
        setQuantity(quantity + 1)
        if (quantity >= quantityProductItem) {
            setQuantity(quantityProductItem)
        }
    }

    const onAddCart = () => {
        let idProductItem, imageProductItem;
        for (let i = 0; i < data.productItem.length; i++) {
            if (data.productItem[i].sizeId == sizeValue && data.productItem[i].colorId == colorValue) {
                idProductItem = data.productItem[i].productItemId
                imageProductItem = data.productItem[i].image
            }
        }
        let cartItem: OrderProduct = {
            cartId: "",
            orderId: orderId,
            idProductItem: String(idProductItem),
            image: String(imageProductItem),
            name: data.name,
            colorId: colorValue,
            sizeId: sizeValue,
            quantity: quantity,
            price: currentPrice
        }

        cartController.addProductToCart(cartItem).then(res => {
            getCartList();
        });
    }

    return (
        <div className="product-details-container">
            <div className="product-details-img">
                <Carousel>
                    {imageData.map((item, index) => (
                        <div key={index}>
                            <img src={item} />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="product-details-information">
                <div className="product-details-name">
                    {data.name}
                </div>

                <div className="product-details-price-brand">
                    <span className="product-details-price">${currentPrice}</span>
                    <div className="border-space"></div>
                    <span className="product-details-sold">0 SOLD</span>
                </div>

                <div className="product-details-color">
                    <h5 className="color-title">
                        Colour:
                    </h5>
                    <Stack direction="row" spacing={1}>
                        {productFilterColor.map((item, index) => (
                            <Button key={index} style={{ backgroundColor: colorValue == item.colorId ? "#6C7AE0" : "", color: colorValue == item.colorId ? "#ffffff" : "#333333", border: "1px solid #DCE0E4", padding: "7px 20px" }} value={item.colorId} onClick={e => getColorValue(e)}>
                                {item.color}
                            </Button>
                        ))}
                    </Stack>
                </div>

                <div className="product-details-size">
                    <h5 className="size-title">
                        Size:
                    </h5>
                    <Stack direction="row" spacing={1}>
                        {currentSizeValue.map((item, index) => (
                            <Button key={index} style={{ backgroundColor: sizeValue == item.sizeId ? "#6C7AE0" : "", color: sizeValue == item.sizeId ? "#ffffff" : "#333333", border: "1px solid #DCE0E4" }} value={item.sizeId} onClick={e => getSizeValue(e)}>
                                {item.size}
                            </Button>
                        ))}
                    </Stack>
                </div>

                <div className="product-details-quantity">
                    <h5 className="quantity-title">
                        Quantity:
                    </h5>
                    <button onClick={productReductionQuantity} className='btn-fa-minus' disabled={(colorValue != "" && sizeValue != "") ? false : true}><i className="fas fa-minus"></i></button>
                    <button disabled={(colorValue != "" && sizeValue != "") ? false : true} className="product-details-quantity-btn">{(colorValue != "" && sizeValue != "") ? quantity : 0}</button>
                    <button onClick={productIncreaseQuantity} className='btn-fa-plus' disabled={(colorValue != "" && sizeValue != "") ? false : true}><i className="fas fa-plus"></i></button>
                </div>

                <div className="add-to-cart-btn">
                    <Button onClick={onAddCart} disabled={(colorValue != "" && sizeValue != "") ? false : true} style={{ padding: "10px 70px", fontSize: "14px", fontWeight: "600" }} variant="outlined">
                        <BsFillCartPlusFill style={{ fontSize: "22px", marginRight: "8px" }} /> Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}
