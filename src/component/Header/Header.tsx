import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setToken } from '../../controller';
import { productController } from '../../controller/ProductController';
import { CartContext } from '../../store/CartProvider';
import { Context } from '../../store/Provider';
import '../Header/Header.css';

export default function Header() {

    const { userName, changeUsername } = useContext(Context);
    const { productNumberCart, cartNumber } = useContext(CartContext);    

    const logOut = () => {
        localStorage.removeItem("Authorization");
        setToken.defaults.headers.common['Authorization'] = "";
        changeUsername("");
        cartNumber(0);
    }

    return (
        <div>
            <div>
                <nav className="nav-bar" id="nav-bar">
                    <div className="tai-khoan">
                        <div className="user-name">
                            <p>{userName}</p>
                        </div>
                        <div className="dang-nhap" id="dangnhap">
                            <Link to="/users/login">Đăng nhập</Link>
                        </div>
                        <div className="border-trai-dang-ki">
                        </div>
                        <div className="dang-ki">
                            <Link onClick={logOut} to="/users/login">Đăng xuất</Link>
                        </div>
                    </div>
                    <div className="mid" />
                    {/* Menu mid */}
                    <div className="top" />
                    <div className="menu-top">
                        <div className="icon-menu-hien-thi">
                            <i className="fas fa-bars fa-2x" />
                        </div>
                        <div className="logo">
                            <Link to='/'>
                                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png" alt="" />
                            </Link>
                        </div>
                        <div className="thanh-tim-kiem">
                            <input id="btnPrimary-tim-san-pham" className="btn-primary" type="text" placeholder="Tìm kiếm..." />
                            <button className="btn"><i className="fas fa-search" /></button>
                        </div>
                        <div className="gio-hang">
                            <Link to="/checkout/cart"><i className="icon-gio-hang fas fa-shopping-cart" /><span>{productNumberCart}</span></Link>
                        </div>
                        <div className="border-trai">
                        </div>
                        <div className="kho-hang">
                            <Link to="/user/orders" className="icon-kho-hang fas fa-box-open fa-1x"> <span>Đơn hàng</span></Link>
                        </div>
                    </div>
                    {/* border */}
                    <div className="mid" />
                </nav>
                {/* Menu bottom */}
                <div className="menu-bottom" id="Menu-on-mobie">
                    <ul className="menu-cap-1">
                        <li className="item-menu-cap-1 thanh-tim-kiem-2">
                            <input id="btnPrimary-tim-san-pham-2" className="btn-primary" type="text" placeholder="Tìm kiếm..." />
                            <button className="btn"><i className="fas fa-search" /></button>
                        </li>
                        <li className="item-menu-cap-1">
                            <Link to='/' className="title-item-menu-cap-1 item-menu-1">TRANG CHỦ</Link>
                        </li>
                        <li className="item-menu-cap-1">
                            <Link to='#' className="title-item-menu-cap-1">GIỚI THIỆU</Link>
                        </li>
                        <li className="item-menu-cap-1">
                            <Link to='#' className="title-item-menu-cap-1">ĐỒNG HỒ NAM</Link>
                        </li>
                        <li className="item-menu-cap-1">
                            <Link to='#' className="title-item-menu-cap-1">ĐỒNG HỒ NỮ</Link>
                        </li>
                        <li className="item-menu-cap-1">
                            <Link to='#' className="title-item-menu-cap-1">BLOGS</Link>
                        </li>
                        <li className="item-menu-cap-1">
                            <Link to='#' className="title-item-menu-cap-1">LIÊN HỆ</Link>
                        </li>
                        <button className="dong-menu-on-mobie"><i id="icon-dong-menu" className="fas fa-times" />Đóng</button>
                    </ul>
                </div>
            </div>
        </div>
    )
}
