import React, { Component } from "react";
import Slider from "react-slick";
import './Slide.css';
import slide1 from '../../img/slide-01.jpg';
import slide2 from '../../img/slide-02.jpg';
import slide3 from '../../img/slide-03.jpg';
import { Link } from "react-router-dom";

export default function Slide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='slide-home-page-container'>
            <div className="content-showcase-home-page">
                <div className="slide-container-left-home-page">
                    <Slider {...settings}>
                        <div className="item-slide-container">
                            <img src={slide1} alt="" />
                            <div className="slide-title-content">
                                <div className="title-slide">
                                    Women Collection 2018
                                </div>

                                <div className="content-title-product">
                                    NEW SEASON
                                </div>

                                <div className="btn-purchase-product">
                                    <Link to="/product"><button>SHOP NOW</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide-container">
                            <img src={slide2} alt="" />
                            <div className="slide-title-content">
                                <div className="title-slide">
                                    Men New-Season
                                </div>

                                <div className="content-title-product">
                                    JACKETS & COATS
                                </div>

                                <div className="btn-purchase-product">
                                    <Link to="/product"><button>SHOP NOW</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="item-slide-container">
                            <img src={slide3} alt="" />
                            <div className="slide-title-content">
                                <div className="title-slide">
                                    Men Collection 2018
                                </div>

                                <div className="content-title-product">
                                    NEW ARRIVALS
                                </div>

                                <div className="btn-purchase-product">
                                    <Link to="/product"><button>SHOP NOW</button></Link>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}
