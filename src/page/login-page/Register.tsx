import React, { useContext, useState } from 'react';
import { setToken, setTokenAdmin } from '../../controller';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { userController } from '../../controller/UserController';
import { UserCreateContext } from '../../store/UserContext';
import { CartCreateContext } from '../../store/CartContext';
import { toast } from 'react-toastify';

export default function Register() {
    const { changeUserInfo } = useContext(UserCreateContext);
    const { getCartList } = useContext(CartCreateContext);
    const [dataUser, setDataUser] = useState({
        fullName: "",
        userName: "",
        passWord: "",
        role: "user",
    })
    const navigate = useNavigate();

    const onRegister = () => {
        userController.register(dataUser).then(res => {
            localStorage.setItem("Authorization", res.data)
            setToken.defaults.headers.common['Authorization'] = res.data;
            setTokenAdmin.defaults.headers.common['Authorization'] = res.data;
            changeUserInfo();
            getCartList();            
            navigate(`/`);
            toast.success("Successful account registration!", {
                position: 'bottom-left',
                autoClose: 1500
            })
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
                        <h2>Register</h2>
                    </div>
                    <div className="form-dang-nhap">
                        <form>
                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="tendangnhap">Full name</label>
                                <input className="input-dang-nhap" type="text" name="tendangnhap" id="tendangnhap" placeholder="Enter your full name" onChange={e => { setDataUser({ ...dataUser, fullName: e.target.value }) }} />
                            </div>

                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="tendangnhap">User name</label>
                                <input className="input-dang-nhap" type="text" name="tendangnhap" id="tendangnhap" placeholder="Enter your user name" onChange={e => { setDataUser({ ...dataUser, userName: e.target.value }) }} />
                            </div>
                            
                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="password">Password</label>
                                <input className="input-dang-nhap" type="password" name="password" id="password" placeholder="Enter your password" onChange={e => { setDataUser({ ...dataUser, passWord: e.target.value }) }} />
                            </div>

                            <div className="sign-in-account">
                                <p>Already have an account! <Link to="/users/login">Login</Link></p>
                            </div>
                        </form>
                        <div onClick={onRegister} className="btn-bt"><button className="btn-dang-nhap" type="submit" id="btndangnhap">Register</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
