import React, { useContext, useEffect, useState } from 'react';
import './Delivery.css';
import DeliveryInfo from './DeliveryInfo';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserOrderInfo } from '../../model/UserOrderInfo';
import { CartCreateContext } from '../../store/CartContext';
import { UserCreateContext } from '../../store/UserContext';
import { orderController } from '../../controller/OrderController';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Delivery() {
    const { orderId, getCartList, cartList } = useContext(CartCreateContext)
    const { userInfo } = useContext(UserCreateContext)
    const [dataOrder, setDataOrder] = useState<UserOrderInfo>({
        orderId: orderId,
        fullName: userInfo.full_name,
        phoneNumber: userInfo.phone_number,
        email: userInfo.email,
        address: userInfo.address,
        postCode: userInfo.post_code,
        orderStatus: "Pending"
    })
    const navigate = useNavigate();
    let total = 0;

    const onPurchase = () => {
        orderController.delivery(dataOrder).then(res => {
            getCartList();                        
        })
        toast.success("Order Success!", {
            position: 'bottom-left',
            autoClose: 1500
        })
        navigate(`/orders`);
    }

    for (let i = 0; i < cartList.length; i++) {
        total += cartList[i].price * cartList[i].quantity
    }

    return (
        <div className="delivery-showcase">
            <div className='Delivery-container'>
                <div className="form-input-user-info">
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#454F5B", marginLeft: "1%" }} className="title-form-input-delivery">
                        Delivery Address
                    </div>

                    <div className="form-input-order-info">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField sx={{ width: '66ch' }} id="outlined-basic" label="Full name" variant="outlined" onChange={e => setDataOrder({ ...dataOrder, fullName: e.target.value })} defaultValue={userInfo.full_name} />

                            <TextField type={'number'} style={{ marginTop: "20px" }} sx={{ width: '32.1ch' }} id="outlined-basic" label="Phone number" variant="outlined" onChange={e => setDataOrder({ ...dataOrder, phoneNumber: e.target.value })} />

                            <TextField style={{ marginTop: "20px" }} sx={{ width: '32.1ch' }} id="outlined-basic" label="Email" variant="outlined" onChange={e => setDataOrder({ ...dataOrder, email: e.target.value })} />

                            <TextField style={{ marginTop: "20px" }} sx={{ width: '66ch' }} id="outlined-basic" label="Address" variant="outlined" onChange={e => setDataOrder({ ...dataOrder, address: e.target.value })} />

                            <TextField style={{ marginTop: "20px" }} sx={{ width: '66ch' }} id="outlined-basic" label="Post code" variant="outlined" onChange={e => setDataOrder({ ...dataOrder, postCode: e.target.value })} />
                        </Box>
                    </div>
                </div>

                <div className="order-info-user">
                    <div className="order-info-check-out">
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#454F5B", marginLeft: "1%" }} className="title-order-info">
                            Your Order
                        </div>
                        <div className="product-list-delivery">
                            {
                                cartList.map((item, index) => (
                                    <DeliveryInfo key={index} cartList={item} />
                                ))
                            }                            
                        </div>

                        <div className="border-bottom-delivery"></div>

                        <div className="total-price-product">
                            <div className="title-total-price-product">
                                Total
                            </div>

                            <div className="total-price-product-delivery">
                                ${total}
                            </div>
                        </div>
                    </div>

                    <div className="btn-check-out-order">
                        <Button disabled={(dataOrder.fullName != "" && dataOrder.phoneNumber != "" && dataOrder.email != "" && dataOrder.address != "" && dataOrder.postCode != "") ? false : true} onClick={onPurchase} variant="contained">CHECK OUT</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
