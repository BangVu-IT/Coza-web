import React from 'react';
import FashionBanner from './FashionBanner';
import './HomePage.css';
import ProductListHome from './ProductListHome';
import Slide from './Slide';

export default function HomePage() {
    return (
        <div className='home-container-background'>
            <Slide />
            <FashionBanner />
            <ProductListHome />
        </div>
    )
}
