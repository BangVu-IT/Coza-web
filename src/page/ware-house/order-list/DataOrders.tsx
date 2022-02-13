import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowTableOrder from './RowTableOrder';
import { OrderWithDetail } from '../../../model/Order';
import '../order-list/DataOrders.css';

interface Props {
    orders: OrderWithDetail[];
    onUpdateStatus: (orderId: string, orderStatus: string) => void;
}

export default function DataOrders(props: Props) {    
    let orderStatus = "";    

    const onSetOrderStatus = (status: string) => {        
        orderStatus = status;        
    }

    return (
        <div className='data-order-list-table'>
            <TableContainer component={Paper} style={{ marginTop: "100px" }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Order id</TableCell>                            
                            <TableCell align="left">Time order</TableCell>
                            <TableCell align="left">Full name</TableCell>
                            <TableCell align="left">Phone number</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">PostCode</TableCell>
                            <TableCell align="left">Order status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.orders.map((row, index) => (
                            <RowTableOrder key={index} row={row} onUpdateStatus={() => props.onUpdateStatus(row.orderId, orderStatus)} onSetStatus={onSetOrderStatus} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
