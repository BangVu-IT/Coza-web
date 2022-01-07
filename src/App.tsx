import './App.css';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import HomePage from './page/home-page/HomePage';
import CartPage from './page/cart-page/CartPage';
import WareHouse from './page/ware-house/WareHouse';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductDetails from './page/product-details/ProductDetails';
import Delivery from './page/cart-page/Delivery';
import OrderProduct from './page/cart-page/OrderProduct';
import Login from './page/login-page/Login';
import { useEffect } from 'react';
import { productController } from './controller/ProductController';
import { useState } from 'react';

export default function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    productController.getMe().then(res => {
      setName(res.data.userName);      
    })
  }, [])  

  return (
    <BrowserRouter>
      <Header name={name} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<WareHouse />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/product/:idProduct" element={<ProductDetails />} />
        <Route path="/checkout/cart" element={<CartPage />} />
        <Route path="/checkout/delivery/:idOrder" element={<Delivery />} />
        <Route path="/user/orders" element={<OrderProduct />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
