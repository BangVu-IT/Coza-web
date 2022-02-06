import React from 'react';
import '../header/HeaderWareHouse.css';
import logo from '../../../img/logo-01.png';
import { Link } from 'react-router-dom';

export default function HeaderWareHouse() {
    return (
        <div>
            <div className="wrap-header-ware-house">                
                <div className="border-space-bottom">
                </div>                
                <div className="menu-header">
                    <ul className="item-menu-header">
                        <li className='item-menu-level-2'>
                            <Link to="#">Home</Link>
                        </li>

                        <li className='item-menu-level-2'>
                            <Link to="#">Products</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
