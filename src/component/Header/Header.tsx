import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import logo from '../../img/logo-01.png';
import { BiUserCircle, BiSearchAlt2 } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { UserCreateContext } from '../../store/UserContext';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartCreateContext } from '../../store/CartContext';
import { setToken } from '../../controller';

export default function Header() {
    const { userInfo, changeUserInfo } = useContext(UserCreateContext);
    const { cartList, orderId, getCartList } = useContext(CartCreateContext);
    const [searchInput, setSearchInput] = useState("");

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const logOut = () => {
        localStorage.removeItem("Authorization");
        setToken.defaults.headers.common['Authorization'] = "";
        changeUserInfo();
    }

    return (
        <div>
            <div className="wrap-menu">
                <nav className="limiter-menu container">
                    <div className="logo-header">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>

                    <div className="menu-navbar">
                        <ul className="main-menu">
                            <li className="item-menu-level-1">
                                <Link to="/">Home</Link>
                            </li>

                            <li className="item-menu-level-1">
                                <Link to="/product">Shop</Link>
                            </li>

                            <li className="item-menu-level-1">
                                <Link to="#">Features</Link>
                            </li>

                            <li className="item-menu-level-1">
                                <Link to="#">About</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="wrap-icon-header">
                        <div className="input-search">
                            <Link to={`/product?search=${searchInput}`}><BiSearchAlt2 /></Link>
                            <input type="text" placeholder='Search product by name...' onChange={e => setSearchInput(e.target.value)} />
                        </div>

                        <div className="cart-icon">
                            <Link to="/checkout/cart">
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={cartList.length} color="secondary">
                                        <ShoppingCartIcon style={{ fontSize: "26px" }} />
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                        </div>

                        <div className="user-icon">
                            <span className='user-icon-item'><Link to='#'><FaRegUserCircle /></Link></span>
                            <ul className="main-menu-user">
                                <li className="item-menu-user-full-name">
                                    <div className="user-img-full-name">
                                        <BiUserCircle style={{ marginRight: "2px" }} /> {userInfo.full_name.substring(0, 7)} ...
                                    </div>
                                </li>
                                <div className="border-bottom-menu-user"></div>
                                <li className="item-menu-user">
                                    <Link to="/orders">Order</Link>
                                </li>
                                <div className="border-bottom-menu-user"></div>
                                <li className="item-menu-user">
                                    <div className="user-log-out">
                                        <IoMdExit style={{ marginRight: "2px" }} /><Link onClick={logOut} to="/users/login">Log out</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
