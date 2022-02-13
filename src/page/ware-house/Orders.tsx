import React from 'react';
import HeaderWareHouse from './header/HeaderWareHouse';
import {ListProduct} from './home-ware-house/ListProduct';
import OrderList from './order-list/OrderList';
import './WareHouse.css';

export default function Orders() {
    return (
        <div className="container-warehouse">
            <HeaderWareHouse />
            <OrderList />
        </div>
    )
}
