import React, { useContext, useState } from 'react';
import '../home-ware-house/HomeWareHouse.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Brand, Color, Product, ProductWithDetail, Size } from '../../../model/Product';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { IoAddSharp } from 'react-icons/io5';
import FormInput from './FormInput';
import RowTable from './RowTable';
import FormInputItem from './FormInpuItem';
import { Context } from '../../../store/ProductContext';

interface Props {
    product: ProductWithDetail[];
    brand: Brand[];
    color: Color[];
    size: Size[];
    onAdd: (product: any) => void
    onUpdate: (product: ProductWithDetail) => void;
    newProductUpdate: ProductWithDetail;
    onDelete: (id: string) => void;
    onAddProductItem: (productItem: Product) => void;
    onDeleteProductItem: (idProduct: string, idProductItem: string) => void;
    getProductId: (productId: string) => void;
    pageCount: number;
    handleChangePage: (page: number) => void;
    handleChangeRowsPerPage: (rowsPerPage: number) => void
}

export default function HomeWareHouse(props: Props) {
    const { idProductItem, changeDisableInput } = useContext(Context);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        changeDisableInput(false);        
    }
    const handleOpen = () => setOpen(true);

    const [openModalItem, setOpenModalItem] = useState(false);
    const handleCloseModalItem = () => setOpenModalItem(false);
    const handleOpenModelItem = () => setOpenModalItem(true);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        props.handleChangePage(newPage + 1)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        props.handleChangeRowsPerPage(parseInt(event.target.value, 10))
    };
    
    return (
        <div>
            <div className="wrap-home-ware-house">
                <Stack style={{ width: "18%", float: "right", marginTop: "30px" }}>
                    <Button style={{padding: "10px 0px"}} onClick={handleOpen} variant="contained"><IoAddSharp style={{ fontSize: "18px", marginRight: "5px" }} /> New product</Button>
                </Stack>

                <TableContainer component={Paper} style={{ marginTop: "100px" }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Product's name</TableCell>
                                <TableCell>Product image</TableCell>
                                <TableCell align="left">Brand</TableCell>
                                <TableCell align="left">Gender</TableCell>
                                <TableCell align="left">CreatedAt</TableCell>
                                <TableCell align="left">UpdatedAt</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.product.map((row, index) => (
                                <RowTable key={row.id} row={row} handleOpen={handleOpen} onUpdate={() => props.onUpdate(row)} onDelete={() => props.onDelete(row.id)} handleOpenModelItem={handleOpenModelItem} getProductId={() => props.getProductId(row.id)} onDeleteProductItem={() => props.onDeleteProductItem(row.id, idProductItem)} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.pageCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            <FormInput key={props.newProductUpdate.id} status={open} handleClose={handleClose} brand={props.brand} color={props.color} size={props.size} onAdd={props.onAdd} newProductUpdate={props.newProductUpdate} />

            <FormInputItem key={Math.random()} status={openModalItem} handleClose={handleCloseModalItem} color={props.color} size={props.size} onAddProductItem={props.onAddProductItem} />
        </div>
    )
}
