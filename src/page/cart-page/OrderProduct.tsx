import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { orderController } from '../../controller/OrderController';
import { OrderWithDetail } from '../../model/Order';
import { UserCreateContext } from '../../store/UserContext';
import ListOrder from './ListOrder';
import Button from '@mui/material/Button';
import './Order.css';
import cartEmpty from '../../img/search.png';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function OrderProduct() {
    const { userInfo } = useContext(UserCreateContext)
    const [data, setData] = useState<OrderWithDetail[]>([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const rowsPerPage = 2;

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getListOrder(userInfo.user_id, value, rowsPerPage);
    };

    useEffect(() => {
        getListOrder(userInfo.user_id, page, rowsPerPage);
    }, [userInfo.user_id])

    const getListOrder = (userId: string, page: number, rowsPerPage: number) => {
        orderController.listOrder(userId, page, rowsPerPage).then(res => {
            setData(res.listOrders);
            setPageCount(res.pageNumbers.length)
        })
    }

    return (
        data.length != 0 ?
            <div className="order-container">
                <div className="title-history">
                    <h4>Orders History</h4>
                </div>

                {
                    data.map((item, index) => (
                        <ListOrder key={index} dataOrder={item} />
                    ))
                }

                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5} style={{ marginBottom: "40px" }}>                    
                    <div className="order-pagination">
                        <Pagination count={pageCount} page={page} onChange={handleChange} />
                    </div>
                </Stack>
            </div>
            :
            <div className="orders-is-empty">
                <div className="image-empty-orders">
                    <img src={cartEmpty} alt="" />
                </div>
                <div className="title-empty-orders">
                    <h5>Order list is empty!</h5>
                </div>
                <div className="desc-empty-orders">
                    <p>Find the product that's right for you and order it now!</p>
                </div>
                <Link to='/' className="btn-keep-buying-orders">
                    <Button variant="contained">Shop now!</Button>
                </Link>
            </div>
    )
}
