import React, { useEffect, useState } from 'react'
import ListOrder from './ListOrder';
import './Order.css';
import { productController } from '../../controller/ProductController';
import { Link } from 'react-router-dom';
import { OrderWithDetail } from '../../model/Order';

export default function OrderProduct() {

    const [data, setData] = useState<OrderWithDetail[]>([]);
    const [pageCount, setpageCount] = useState<[]>([]);
    const [indexPage, setIndexPage] = useState<number>(1);    
    const pageSize = 1;

    useEffect(() => {
        productController.listOrder(1, pageSize).then(res => {
            setData(res.listOrders);
            setpageCount(res.pageNumbers);
        })
    }, [])

    const onPageNumber = (page: number) => {
        productController.listOrder(page, pageSize).then(res => {
            setData(res.listOrders);
            setIndexPage(page);
        })
    }

    const prePage = () => {        
        if (indexPage > 1) {
            onPageNumber(indexPage - 1);
            setIndexPage(indexPage - 1);            
        }       
    }

    const nextPage = () => {          
        if (indexPage < pageCount.length) {
            onPageNumber(indexPage + 1);
            setIndexPage(indexPage + 1);
        }        
    }
        
    return (
        data.length != 0 ?
        <div className="order-container">
            <div className="title-history">
                <h4>Lịch sử mua hàng</h4>
            </div>

            {
                data.map((item, index) => (
                    <ListOrder key={index} dataOrder={item} />
                ))
            }

            <div className="pageNumber page-number-order">
                <i onClick={prePage} className= {(indexPage == 1 ? "page-limit" : "") + " fas fa-chevron-left"}></i>
                <div className="page-number">
                    {pageCount.map((item, index) => (
                        <button className={indexPage == index + 1 ? "btn-page-number" : ""} onClick={() => onPageNumber(item)}>{item}</button>
                    ))}
                </div>
                <i onClick={nextPage} className={(indexPage == pageCount.length ? "page-limit-top" : "") + " fas fa-chevron-right"}></i>
            </div>
        </div>
        :
        <div className="orders-is-empty">
            <div className="image-empty-orders">
                <img src="https://beemall.io/search.png" alt="" />
            </div>
            <div className="title-empty-orders">
                <h5>Bạn chưa đặt đơn hàng nào!</h5>
            </div>
            <div className="desc-empty-orders">
                <p>Hãy tìm những sản phẩm phù hợp với bạn và đặt mua ngay nào!</p>
            </div>
            <Link to='/' className="btn-keep-buying-orders">
                <button>Mua hàng ngay!</button>
            </Link>
        </div>
    )
}
