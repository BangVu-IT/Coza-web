import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import HomePage from "./page/home-page/HomePage";
import WareHouse from "./page/ware-house/WareHouse";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductDetails from "./page/product-details/ProductDetails";
import OrderProduct from "./page/cart-page/OrderProduct";
import Login from "./page/login-page/Login";
import { ProductContext } from "./store/ProductContext";
import { UserContext } from "./store/UserContext";
import { CartContext } from "./store/CartContext";
import CartPage from "./page/cart-page/CartPage";
import Delivery from "./page/cart-page/Delivery";
import ProductListSearch from "./page/home-page/ProductListSearch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./page/ware-house/Orders";
import LayOutAdmin from "./layout/LayOutAdmin";
import LayOutUser from "./layout/LayOutUser";
import Brand from "./page/ware-house/Brand";
import User from "./page/ware-house/User";
import Register from "./page/login-page/Register";

export function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <UserContext>
        <ProductContext>
          <CartContext>
            <Routes>
              <Route path="/users/login" element={<Login />} />
              <Route path="/users/register" element={<Register />} />

              {/* layout admin */}
              <Route path="/admin" element={<LayOutAdmin><WareHouse /></LayOutAdmin>} />
              <Route path="/admin/orders" element={<LayOutAdmin><Orders /></LayOutAdmin>} />
              <Route path="/admin/brands" element={<LayOutAdmin><Brand /></LayOutAdmin>} />
              <Route path="/admin/users" element={<LayOutAdmin><User /></LayOutAdmin>} />

              {/* layout user */}
              <Route path="/" element={<LayOutUser><HomePage /></LayOutUser> } />              
              <Route path="/product/:idProduct" element={<LayOutUser><ProductDetails /></LayOutUser> } />                            
              <Route path="/checkout/cart" element={<LayOutUser><CartPage /></LayOutUser> } />
              <Route path="/checkout/delivery" element={<LayOutUser><Delivery /></LayOutUser> } />
              <Route path="/orders" element={<LayOutUser><OrderProduct /></LayOutUser> } />
              <Route path="/product" element={<LayOutUser><ProductListSearch /></LayOutUser> } />              
            </Routes>
          </CartContext>
        </ProductContext>
      </UserContext>
    </BrowserRouter>
  );
}
