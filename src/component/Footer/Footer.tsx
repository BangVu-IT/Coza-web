import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer/Footer.css';
import { FaFacebookF } from 'react-icons/fa';
import { BsInstagram, BsGoogle } from 'react-icons/bs';
import pay1 from '../../img/icon-pay-01.png';
import pay2 from '../../img/icon-pay-02.png';
import pay3 from '../../img/icon-pay-03.png';
import pay4 from '../../img/icon-pay-04.png';
import pay5 from '../../img/icon-pay-05.png';

export default function Footer() {
    return (
        <footer className='footer-container'>
            <div className="footer-container-item">
                <div className="footer-home-page">
                    <div className="item-footer-home-page">
                        <div className="title-footer-home-page-1 title-item-footer-home-page">CATEGORIES</div>
                        <div className="title-footer-home-page">Women</div>
                        <div className="title-footer-home-page">Men</div>
                        <div className="title-footer-home-page">Shoes</div>
                        <div className="title-footer-home-page">Watches</div>
                    </div>
                    <div className="item-footer-home-page">
                        <div className="title-footer-home-page-1 title-item-footer-home-page">HELP</div>
                        <div className="title-footer-home-page">Track Order</div>
                        <div className="title-footer-home-page">Returns</div>
                        <div className="title-footer-home-page">Shipping</div>
                        <div className="title-footer-home-page">FAQs</div>
                    </div>
                    <div className="item-footer-home-page">
                        <div className="title-footer-home-page-1 title-item-footer-home-page">GET IN TOUCH</div>
                        <div className="title-footer-home-page"><p>Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p></div>
                        <div className="title-footer-home-page icon-contact">
                            <Link className='item-icon-contact' to="#">
                                <FaFacebookF />
                            </Link>
                            <Link className='item-icon-contact' to="#">
                                <BsInstagram />
                            </Link>
                            <Link className='item-icon-contact' to="#">
                                <BsGoogle />
                            </Link>
                        </div>
                    </div>
                    <div className="item-footer-home-page">
                        <div className="title-footer-home-page-1 title-item-footer-home-page">NEWSLETTER</div>
                        <div className="title-footer-home-page">
                            <input type="text" name="" id="" />
                        </div>
                        <div className="title-footer-home-page">
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>

                <div className="billing-information">
                    <div className="image-payment-support">
                        <Link to="#" className="item-image-payment-support">
                            <img src={pay1} alt="" />
                        </Link>
                        <Link to="#" className="item-image-payment-support">
                            <img src={pay2} alt="" />
                        </Link>
                        <Link to="#" className="item-image-payment-support">
                            <img src={pay3} alt="" />
                        </Link>
                        <Link to="#" className="item-image-payment-support">
                            <img src={pay4} alt="" />
                        </Link>
                        <Link to="#" className="item-image-payment-support">
                            <img src={pay5} alt="" />
                        </Link>
                    </div>

                    <div className="footer-desc">
                        Copyright ©2022 All rights reserved | Made with  by <Link to="#" style={{color: "#3D7BFF"}}>Colorlib</Link> & distributed by <Link to="#" style={{color: "#3D7BFF"}}>ThemeWagon</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
