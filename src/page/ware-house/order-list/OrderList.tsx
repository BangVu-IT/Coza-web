import React, { useEffect, useState } from 'react'
import { orderController } from '../../../controller/OrderController';
import { OrderWithDetail } from '../../../model/Order';
import DataOrders from './DataOrders'

export default function OrderList() {
    const [data, setData] = useState<OrderWithDetail[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);

    useEffect(() => {
        getOrderList(page, rowsPerPage);
    }, [page])

    const getOrderList = (page: number, rowsPerPage: number) => {
        orderController.listOrderManage(page, rowsPerPage).then(res => {
            setData(res.listOrders)
            // setPageCount(res.pageNumberProduct);
        })
    }

    const onUpdateStatus = (orderId: string, orderStatus: string) => {
        orderController.onUpdateOrderStatus(orderId, orderStatus).then(res => {
            getOrderList(page, rowsPerPage);
        })
    }
    
    return (
        <div>
            <DataOrders orders={data} onUpdateStatus={onUpdateStatus} />
        </div>
    )
}
