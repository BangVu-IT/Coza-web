import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Brand, Color, Product, ProductLine, ProductWithDetail, Size } from '../../../model/Product';
import { Context } from '../../../store/ProductContext';

interface Props {
    status: boolean;
    handleClose: () => void;    
    color: Color[];
    size: Size[];  
    onAddProductItem: (productItem: Product) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 630,
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function FormInputItem(props: Props) {
    const { productItem } = useContext(Context);
    const [colorProduct, setColorProduct] = useState("");
    const [sizeProduct, setSizeProduct] = useState("");
    const [newProductItem, setNewProductItem] = useState<Product>({
        productItemId: productItem.productItemId,
        productId: productItem.productId,
        image: productItem.image,
        colorId: productItem.colorId,
        color: productItem.color,
        sizeId: productItem.sizeId,
        size: productItem.size,
        price: productItem.price,
        quantity: productItem.quantity
    });
    
    return (
        <div>
            <Modal
                keepMounted
                open={props.status}
                onClose={props.handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{...style, borderRadius: "5px"}}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Add product item
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ m: 1, width: '61ch' }} style={{ marginTop: "20px" }} id="outlined-basic" label="Image" variant="outlined" onChange={e => setNewProductItem({ ...newProductItem, image: e.target.value })} defaultValue={newProductItem.image} />

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={newProductItem.colorId}
                                label="Color"
                                onChange={e => setNewProductItem({ ...newProductItem, colorId: e.target.value })}
                                sx={{ width: '29.6ch' }}
                            >
                                {props.color.map((colorItem, index) =>
                                    <MenuItem key={index} value={colorItem.color_id}>{colorItem.color}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={newProductItem.sizeId}
                                label="Size"
                                onChange={e => setNewProductItem({ ...newProductItem, sizeId: e.target.value })}
                                sx={{ width: '29.6ch' }}
                            >
                                {props.size.map(sizeItem =>
                                    <MenuItem key={sizeItem.size_id} value={sizeItem.size_id}>{sizeItem.size}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <TextField sx={{ width: '29.6ch' }} type={'number'} style={{ marginTop: "20px" }} id="outlined-basic" label="Quantity" variant="outlined" onChange={e => setNewProductItem({ ...newProductItem, quantity: Number(e.target.value) })} defaultValue={newProductItem.quantity} />

                        <TextField sx={{ width: '29.6ch' }} type={'number'} style={{ marginTop: "20px" }} id="outlined-basic" label="Price" variant="outlined" onChange={e => setNewProductItem({ ...newProductItem, price: Number(e.target.value) })} defaultValue={newProductItem.price} />

                        <Button sx={{ width: '69ch' }} style={{ marginTop: "20px", padding: "8px 0" }} variant="contained" disableElevation onClick={() => { props.onAddProductItem(newProductItem); props.handleClose() }}>
                            Add product item
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
