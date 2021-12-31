import React from 'react'
import { ProductList } from './ProductList'
import { Product } from '../../model/Product';

interface Props {
    product: Product[];
    onRemove: (id: string) => void;
    onUpdate: (product: Product) => void;
    onSearch: (inputValue: string) => void;
};

export default function WareHouseProduct(props: Props) {    
    return (
        <div className="container-right">
            <div className="border-space">                
            </div>
            <div className="tim-kiem-sp">
                <input type="text" id="tim-sp" onChange={e => props.onSearch(e.target.value)} placeholder="Nhập tên sản phẩm cần tìm..." />
                <button><i className="fas fa-search"></i></button>
            </div>

            <div className="sap-xep-san-pham">
                <h3 className="dssp-trong-kho">DANH SÁCH SẢN PHẨM</h3>
            </div>

            <div id="danh-sach-sp">
                {
                    props.product.map((item, index) => <ProductList key={index} product={item} onRemove={() => props.onRemove(item.id)} onUpdate={() => props.onUpdate(item)} />)
                }
            </div>
        </div>
    )
}
