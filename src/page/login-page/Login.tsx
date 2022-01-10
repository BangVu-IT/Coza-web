import React, { useState } from 'react';
import { setToken } from '../../controller';
import { productController } from '../../controller/ProductController';
import './Login.css';
import { useNavigate } from "react-router-dom";

export default function Login() {    
    const [dataUser, setDataUser] = useState<object>({
        userName: "",
        passWord: ""
    })
    const navigate = useNavigate();

    const onLogin = () => {        
        productController.login(dataUser).then(res => {
            localStorage.setItem("Authorization", res.data)
            setToken.defaults.headers.common['Authorization'] = res.data;
            navigate(`/`);
        })
    }

    return (
        <div>
            <div className="main-container">
                <div className="container-dang-nhap">
                    <div className="logo-login">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="title-content-login">
                        <h2>Đăng nhập</h2>
                    </div>
                    <div className="form-dang-nhap">
                        <form>
                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="tendangnhap">Tên tài khoản</label>
                                <input className="input-dang-nhap" type="text" name="tendangnhap" id="tendangnhap" placeholder="Nhập tên tài khoản" onChange={e => { setDataUser({ ...dataUser, userName: e.target.value }) }} />
                            </div>
                            <div className="form-el">
                                <label className="label-dang-nhap" htmlFor="password">Mật Khẩu</label>
                                <input className="input-dang-nhap" type="password" name="password" id="password" placeholder="Nhập mật khẩu" onChange={e => { setDataUser({ ...dataUser, passWord: e.target.value }) }} />
                            </div>
                        </form>
                        <div onClick={onLogin} className="btn-bt"><button className="btn-dang-nhap" type="submit" id="btndangnhap">Đăng Nhập</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
