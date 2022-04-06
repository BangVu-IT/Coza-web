import React from 'react';
import './FashionBanner.css';
import banner1 from '../../img/banner-04.jpg';
import banner2 from '../../img/banner-05.jpg';
import { Link } from 'react-router-dom';

export default function FashionBanner() {
  return (
    <div className='fashion-banner-main-container'>
      <div className="fashion-banner">
        <div className="fashion-banner-item">
          <img src={banner1} alt="" />
          <div className="fashion-banner-item-content">
            <div className="title-fashion-banner">
              Women
            </div>
            <div className="content-title-product-fashion-banner">
              Spring 2022
            </div>
            <div className="btn-purchase-product-fashion-banner">
              <Link to="/product">SHOP NOW</Link>
            </div>
          </div>
        </div>

        <div className="fashion-banner-item">
          <img src={banner2} alt="" />
          <div className="fashion-banner-item-content">
            <div className="title-fashion-banner">
              Men
            </div>
            <div className="content-title-product-fashion-banner">
              Spring 2022
            </div>
            <div className="btn-purchase-product-fashion-banner">
              <Link to="/product">SHOP NOW</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
