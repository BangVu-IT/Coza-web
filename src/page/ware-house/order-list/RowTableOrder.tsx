import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import Fab from '@mui/material/Fab';
import { OrderWithDetail } from '../../../model/Order';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    row: OrderWithDetail;
    onUpdateStatus: () => void;
    onSetStatus: (orderStatus: string) => void;
}

export default function RowTableOrder(props: Props) {
    const [open, setOpen] = useState(false);
    let timeOrder = new Date(props.row.createdAt);
    const [status, setStatus] = useState(props.row.orderStatus);

    const handleChange = (e: any) => {
        setStatus(e.target.value);
        props.onSetStatus(e.target.value);
    }

    // console.log(status);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="medium"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.row.orderId}
                </TableCell>
                <TableCell align="left">{timeOrder.toLocaleString()}</TableCell>
                <TableCell align="left">{props.row.fullName}</TableCell>
                <TableCell align="left">{props.row.phoneNumber}</TableCell>
                <TableCell className="row-email-order" align="left">{props.row.email}</TableCell>
                <TableCell align="left">{props.row.address}</TableCell>
                <TableCell align="left">{props.row.postCode}</TableCell>
                <TableCell align="left">
                    <Box sx={{ minWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={status}
                                label="Status"
                                onChange={e => {handleChange(e); props.onUpdateStatus()}}
                                style={{color: status == "Pending" ? "#B90000" : status == "Confirmed" ? "#2E8510" : status == "Delivering" ? "#244F9F" : "#42B800", fontWeight: "500"}}
                            >
                                <MenuItem style={{color: "#B90000", fontWeight: "500"}} value="Pending">Pending</MenuItem>
                                <MenuItem style={{color: "#2E8510", fontWeight: "500"}} value="Confirmed">Confirmed</MenuItem>
                                <MenuItem style={{color: "#244F9F", fontWeight: "500"}} value="Delivering">Delivering</MenuItem>
                                <MenuItem style={{color: "#42B800", fontWeight: "500"}} value="Delivered">Delivered</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Product
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Color</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell align="left">Quantity</TableCell>
                                        <TableCell align="left">Price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.row.orderProducts.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <img style={{ width: "60px" }} src={item.product?.image} alt="" />
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell align="left">{item.brand}</TableCell>
                                            <TableCell align="left"> {item.gender}</TableCell>
                                            <TableCell align="left">{item.product?.color}</TableCell>
                                            <TableCell align="left">{item.product?.size}</TableCell>
                                            <TableCell align="left">{item.product?.quantity}</TableCell>
                                            <TableCell align="left">{item.product?.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
