import React from 'react';
import './HomePage.css';
import ProductListHome from './ProductListHome';
import Slide from './Slide';

export default function HomePage() {
    return (
        <div className='home-container-background'>
            <Slide />
            <ProductListHome />
        </div>
    )
}
