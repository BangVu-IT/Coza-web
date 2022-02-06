import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import HomePage from './page/home-page/HomePage';
import WareHouse from './page/ware-house/WareHouse';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductDetails from './page/product-details/ProductDetails';
import OrderProduct from './page/cart-page/OrderProduct';
import Login from './page/login-page/Login';
import { ProductContext } from './store/ProductContext';
import { UserContext } from './store/UserContext';
import { CartContext } from './store/CartContext';
import CartPage from './page/cart-page/CartPage';
import Delivery from './page/cart-page/Delivery';
import ProductListSearch from './page/home-page/ProductListSearch';

export function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <ProductContext>
          <CartContext>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<WareHouse />} />
              <Route path="/product/:idProduct" element={<ProductDetails />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/checkout/cart" element={<CartPage />} />
              <Route path="/checkout/delivery" element={<Delivery />} />
              <Route path="/orders" element={<OrderProduct />} />
              <Route path="/product" element={<ProductListSearch />} />
            </Routes>
            {/* <Footer /> */}
          </CartContext>
        </ProductContext>
      </UserContext>
    </BrowserRouter>
  );
}
