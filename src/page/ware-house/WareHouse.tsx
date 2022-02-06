import React from 'react';
import HeaderWareHouse from './header/HeaderWareHouse';
import HomeWareHouse from './home-ware-house/HomeWareHouse';
import {ListProduct} from './home-ware-house/ListProduct';
import './WareHouse.css';

export default function WareHouse() {
    return (
        <div className="container-warehouse">
            <HeaderWareHouse />
            <ListProduct />
        </div>
    )
}
