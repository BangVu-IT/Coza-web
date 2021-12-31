import React from 'react';
import Products from './Products';
import { Product } from '../../model/Product';

interface Props {
    product: Product[];
    onProductDetails: (id: string) => void;
    onPageNumber: (page: number) => void;
    countPage: ([]);
    nextPage: () => void;
    prePage: () => void;
    onSearch: (keyWord: string) => void;
    pageLimit: string;
    pageLimitTop: string;
    pageIndex: number;
};

export default function ProductComponent(props: Props) {
    return (
        <div>
            <div className="tieu-de-danh-sach-sp">
                <h2 className="title-danh-sach-sp">DANH SÁCH SẢN PHẨM</h2>
            </div>

            <div className="tim-kiem-sp-theo-ten">
                <input type="text" className="tim-kiem-san-pham" onChange={e => props.onSearch(e.target.value)} placeholder="Nhập tên sản phẩm cần tìm..." />
                <i className="fas fa-search"></i>
            </div>

            <div id="danh-sach-san-pham">
                {props.product.map(item => <Products product={item} onProductDetails={() => props.onProductDetails(item.id)} />)}
            </div>

            <div className="pageNumber">
                <i onClick={props.prePage} className= {props.pageLimit + " fas fa-chevron-left"}></i>
                <div className="page-number">
                    {props.countPage.map((item, index) => <button className={props.pageIndex == index + 1 ? "btn-page-number" : ""} onClick={() => props.onPageNumber(item)}>{item}</button>)}
                </div>
                <i onClick={props.nextPage} className={props.pageLimitTop + " fas fa-chevron-right"}></i>
            </div>
        </div>
    )
}
