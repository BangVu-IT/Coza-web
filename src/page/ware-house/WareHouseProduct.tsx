import React from 'react'
import { ProductList } from './ProductList'
import { Product } from '../../model/Product';

interface Props {
    product: Product[];
    onRemove: (id: string) => void;
    onUpdate: (product: Product) => void;
    onPageNumber: (page: number) => void;
    countPage: ([]);
    nextPage: () => void;
    prePage: () => void;
    onSearch: (keyWord: string) => void;
    pageLimit: string;
    pageLimitTop: string;
    pageIndex: number;
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

            <div className="pageNumber page-number-warehouse">
                <i onClick={props.prePage} className= {props.pageLimit + " fas fa-chevron-left"}></i>
                <div className="page-number">
                    {props.countPage.map((item, index) => <button className={props.pageIndex == index + 1 ? "btn-page-number" : ""} onClick={() => props.onPageNumber(item)}>{item}</button>)}
                </div>
                <i onClick={props.nextPage} className={props.pageLimitTop + " fas fa-chevron-right"}></i>
            </div>
        </div>
    )
}
