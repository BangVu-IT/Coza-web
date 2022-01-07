import React, { useState } from 'react';
import { Product } from '../../model/Product';
import './WareHouse.css';

interface Props {
    onAdd: (product: Product) => void;
    product: Product;
};

export default function FormInput(props: Props) {
    const [newProduct, setNewProduct] = useState<Product>({
        id: props.product.id,
        image: props.product.image,
        name: props.product.name,
        brand: props.product.brand,
        price: props.product.price
    });    
        
    const [checkValidate, setValidate] = useState<boolean>(true);
    const [checkValidate2, setValidate2] = useState<boolean>(true);
    const [checkValidate3, setValidate3] = useState<boolean>(true);
    const [checkValidate4, setValidate4] = useState<boolean>(true);
    
    const validate = (item:string) => {
        if (item == 'image') {
            newProduct.image.length == 0 ? setValidate(false) : setValidate(true)
        } else if (item == "name") {
            newProduct.name.length == 0 ? setValidate2(false) : setValidate2(true)
        } else if (item == "brand") {
            newProduct.brand.length == 0 ? setValidate3(false) : setValidate3(true)
        } else if (item == "price") {
            newProduct.price <= 0 ? setValidate4(false) : setValidate4(true)
        }
    }
    
    const onInput = () => {
        setValidate(true);
    }
    const onInput2 = () => {
        setValidate2(true);
    }
    const onInput3 = () => {
        setValidate3(true);
    }
    const onInput4 = () => {
        setValidate4(true);
    }

    const imageError = checkValidate == false ? "Vui lòng nhập link ảnh!" : ""
    const nameError = checkValidate2 == false ? "Vui lòng nhập tên!" : ""
    const brandError = checkValidate3 == false ? "Vui lòng nhập hãng!" : ""
    const priceError = checkValidate4 == false ? "Giá phải lớn hơn 0!" : ""

    const subMidFormValidate = () => {
        validate("image");
        validate("name");
        validate("brand");
        validate("price");

        if (newProduct.image.length > 0 && newProduct.name.length > 0 && newProduct.brand.length > 0 && newProduct.price > 0) {
            props.onAdd(newProduct);
        }
    }

    return (
        <div className="container-left">
            <div id="them-san-pham" className="form-them-sp">
                <h2 className="title-them-sp">Thêm sản phẩm</h2>

                <label htmlFor="anh-sp">Link ảnh: </label>
                <input type="text" name="image" id="anh-sp" onChange={e => setNewProduct({...newProduct, image: e.target.value})} onInput={onInput} onBlur={() => validate("image")} value={newProduct.image} />
                <label className='image-error' htmlFor="">{imageError}</label>

                <label htmlFor="ten-sp">Tên sản phẩm: </label>
                <input type="text" name="name" id="ten-sp" onChange={e => setNewProduct({...newProduct, name: e.target.value})} onInput={onInput2} onBlur={() => validate("name")} value={newProduct.name} />
                <label className='name-error' htmlFor="">{nameError}</label>

                <label htmlFor="hang-sp">Hãng sản phẩm: </label>
                <input type="text" name="brance" id="hang-sp" onChange={e => setNewProduct({...newProduct, brand: e.target.value})} onInput={onInput3} onBlur={() => validate("brance")} value={newProduct.brand} />
                <label className='brance-error' htmlFor="">{brandError}</label>

                <label htmlFor="gia-sp">Giá sản phẩm: </label>
                <input type="number" name="price" id="gia-sp" onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} onInput={onInput4} onBlur={() => validate("price")} value={newProduct.price} />
                <label className='price-error' htmlFor="">{priceError}</label>

                <button id="btnthem" onClick={subMidFormValidate}>Thêm Sản Phẩm</button>
            </div>
            <button className="btn-cap-nhat-san-pham-sua">Cập nhật sản phẩm</button>
        </div>
    )
}
