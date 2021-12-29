import React, { useEffect, useState } from 'react';
import '../product-details/ProductDetails.css';
import { useParams } from 'react-router-dom';
import { productController } from '../../controller/ProductController';
import { Product } from '../../model/Product';
import { Cart } from '../../model/Cart';
import { getDataLocal, setDataLocal } from '../../model/DataLocal';

export default function ProductDetails() {

    const [value, setValue] = useState<Product>();
    const [quantilyProduct, setQuantily] = useState<number>(1);

    const { idProduct } = useParams();
    useEffect(() => {
        productController.productDetails(String(idProduct)).then(res => {
            setValue(res);
        })
    }, [])

    const onAddCart = () => {
        getDataLocal();
        let cartProduct: Cart[] = getDataLocal();
        let checkproduct: boolean = true;
        for (let i = 0; i < cartProduct.length; i++) {
            if (cartProduct[i].id == value?.id) {
                cartProduct[i].quantily += quantilyProduct;
                checkproduct = false;
            }
        }
        let itemCart: Cart;
        if (checkproduct == true) {
            itemCart = {
                id: String(value?.id),
                image: String(value?.image),
                name: String(value?.name),
                brance: String(value?.brance),
                price: Number(value?.price),
                quantily: Number(quantilyProduct),                
            }
            cartProduct.push(itemCart)
        }        
        setDataLocal(cartProduct);
    }
    
    return (
        <div className="chi-tiet-san-pham">
            <section className="sanpham">
                <div className="khoitrai">
                    <div className="anh">
                        <div className="mask"> <img src={value?.image} alt="" />  </div>
                    </div>
                </div>
                <div className="khoiphai">
                    <h2><b>{value?.name}</b></h2>
                    <h3 className='name-brance'><b>{value?.brance}</b></h3>
                    <h1>{value?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <u>đ</u> </h1>
                    <div className="concat">
                        <input type="number" name="soluong" id="soluong" min="1" placeholder="SL" onChange={(e) => setQuantily(Number(e.target.value))} />
                        <button onClick={onAddCart}><b>THÊM VÀO GIỎ</b> </button>
                    </div>
                    <div className="tinh"><div className="ship">
                        <p><b>Tính phí ship tự động</b> </p>
                        <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-ghn.jpg" alt="" /></a>
                        <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-ghtk.jpg" alt="" /></a>
                        <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-ninja-van.jpg" alt="" /></a>
                        <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-shipchung.jpg" alt="" /></a>
                        <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-viettle-post.jpg" alt="" /></a>
                        <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-vn-post.jpg" alt="" /></a>
                    </div>
                        <div className="thanhtoan">
                            <p><b> Thanh toán</b></p>
                            <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-vib.jpg" alt="" /></a>
                            <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-vcb.jpg" alt="" /></a>
                            <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-techcombank.jpg" alt="" /></a>
                            <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-paypal.jpg" alt="" /></a>
                            <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-mastercard.jpg" alt="" /></a>
                            <a href="lienhe.html"><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2018/10/logo-acb.jpg" alt="" /></a>
                        </div></div>
                    <div className="dk">
                        <h5>"Hãy trở thành Affilicate của chúng tôi để tìm thêm thu nhập thụ động, kiếm tiền online"</h5>
                        <button><b>Đăng ký Affilicate</b> </button>
                        <div className="masp">
                            <p>Mã: M5039V-1</p>
                            <p>Danh mục: Đồng hồ, Nam</p></div>
                    </div>
                </div>
            </section>
        </div>
    )
}
