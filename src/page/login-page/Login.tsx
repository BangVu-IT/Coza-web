import React, { useContext, useState } from 'react';
import { setToken } from '../../controller';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { userController } from '../../controller/UserController';
import { UserCreateContext } from '../../store/UserContext';
import { CartCreateContext } from '../../store/CartContext';

export default function Login() {
    const { changeUserInfo } = useContext(UserCreateContext);
    const { getCartList } = useContext(CartCreateContext);
    const [dataUser, setDataUser] = useState({
        userName: "",
        passWord: ""
    })
    const navigate = useNavigate();

    const onLogin = () => {
        userController.login(dataUser).then(res => {                 
            localStorage.setItem("Authorization", res.data)
            setToken.defaults.headers.common['Authorization'] = res.data;
            changeUserInfo();
            getCartList();
            navigate(`/`);
        })
    }

    return (
        <div>
            <div className="main-container">
                <div className="container-dang-nhap">
                    <div className="logo-login">                        
                        <FaRegUserCircle />
                    </div>
                    <div className="title-content-login">
                        <h2>Log in</h2>
                    </div>
                    <div className="form-dang-nhap">
                        <form>
                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="tendangnhap">User name</label>
                                <input className="input-dang-nhap" type="text" name="tendangnhap" id="tendangnhap" placeholder="Enter your name" onChange={e => { setDataUser({ ...dataUser, userName: e.target.value }) }} />
                            </div>
                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="password">Password</label>
                                <input className="input-dang-nhap" type="password" name="password" id="password" placeholder="Enter your password" onChange={e => { setDataUser({ ...dataUser, passWord: e.target.value }) }} />
                            </div>

                            <div className="sign-in-account">
                                <p>You don't have any account? <Link to="#">Register</Link></p>
                            </div>
                        </form>
                        <div onClick={onLogin} className="btn-bt"><button className="btn-dang-nhap" type="submit" id="btndangnhap">Log in</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
