import React from 'react';
import '../header/HeaderWareHouse.css';
import { Link } from 'react-router-dom';

export default function HeaderWareHouse() {
    return (
        <div>
            <div className="wrap-header-ware-house">
                <div className="border-space-bottom">
                </div>
                <div className="menu-header">
                    <ul className="item-menu-header">
                        <Link to="/admin">
                            <li className='item-menu-level-2'>
                                Products
                            </li>
                        </Link>

                        <Link to="/admin/orders">
                            <li className='item-menu-level-2'>
                                Orders
                            </li>
                        </Link>

                        <Link to="/admin/brands">
                            <li className='item-menu-level-2'>
                                Brand
                            </li>
                        </Link>

                        <Link to="/admin/users">
                            <li className='item-menu-level-2'>
                                User
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
