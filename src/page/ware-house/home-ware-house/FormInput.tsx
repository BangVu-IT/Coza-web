import React, { useContext, useState } from 'react';
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
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Brand, Color, ProductWithDetail, Size } from '../../../model/Product';
import { Context } from '../../../store/ProductContext';

interface Props {
    status: boolean;
    handleClose: () => void;
    brand: Brand[];
    color: Color[];
    size: Size[];
    onAdd: (product: any) => void;
    newProductUpdate: ProductWithDetail;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function FormInput(props: Props) {
    const { disableInput } = useContext(Context);
    const [colorProduct, setColorProduct] = useState("");
    const [sizeProduct, setSizeProduct] = useState("");
    const [newProduct, setNewProduct] = useState({
        id: props.newProductUpdate.id,
        imageProduct: props.newProductUpdate.imageProduct,
        name: props.newProductUpdate.name,
        brandId: props.newProductUpdate.brandId,
        brand: props.newProductUpdate.brand,
        gender: props.newProductUpdate.gender,
        createdAt: "",
        updatedAt: "",
        sold: 0,
        productItem: {
            productItemId: "",
            productId: "",
            image: "",
            color: "",
            size: "",
            price: 0,
            quantity: 0
        }
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
                <Box sx={{ ...style, borderRadius: "5px" }}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Add product
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ m: 1, width: '61.8ch' }} id="outlined-basic" label="Product image" variant="outlined" onChange={e => setNewProduct({ ...newProduct, imageProduct: e.target.value })} defaultValue={newProduct.imageProduct} />

                        <TextField sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="Name" variant="outlined" onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} defaultValue={newProduct.name} />

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={newProduct.brandId}
                                label="Brand"
                                onChange={e => setNewProduct({ ...newProduct, brandId: e.target.value })}
                                sx={{ width: '30ch' }}
                            >
                                {props.brand.map((brandItem, index) =>
                                    <MenuItem key={index} value={brandItem.brand_id}>{brandItem.brand}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl style={{ marginLeft: "15px" }} component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={e => setNewProduct({ ...newProduct, gender: e.target.value })} defaultValue={newProduct.gender}>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>

                        <TextField disabled={disableInput ? true : false} sx={{ m: 1, width: '61.8ch' }} id="outlined-basic" label="Product item image" variant="outlined" onChange={e => setNewProduct({ ...newProduct, productItem: { ...newProduct.productItem, image: e.target.value } })} />

                        <FormControl>
                            <InputLabel disabled={disableInput ? true : false} id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                disabled={disableInput ? true : false}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={colorProduct}
                                label="Color"
                                onChange={e => { setColorProduct(e.target.value as string); setNewProduct({ ...newProduct, productItem: { ...newProduct.productItem, color: e.target.value } }) }}
                                sx={{ width: '30ch' }}
                            >
                                {props.color.map(colorItem =>
                                    <MenuItem key={colorItem.color_id} value={colorItem.color_id}>{colorItem.color}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel disabled={disableInput ? true : false} id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                disabled={disableInput ? true : false}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sizeProduct}
                                label="Size"
                                onChange={e => { setSizeProduct(e.target.value as string); setNewProduct({ ...newProduct, productItem: { ...newProduct.productItem, size: e.target.value } }) }}
                                sx={{ width: '30ch' }}
                            >
                                {props.size.map(sizeItem =>
                                    <MenuItem key={sizeItem.size_id} value={sizeItem.size_id}>{sizeItem.size}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <TextField disabled={disableInput ? true : false} type={'number'} sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="Quantity" variant="outlined" onChange={e => setNewProduct({ ...newProduct, productItem: { ...newProduct.productItem, quantity: Number(e.target.value) } })} />

                        <TextField disabled={disableInput ? true : false} type={'number'} sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="Price" variant="outlined" onChange={e => setNewProduct({ ...newProduct, productItem: { ...newProduct.productItem, price: Number(e.target.value) } })} />

                        <Button style={{ marginTop: "20px", padding: "8px 0" }} sx={{ width: '69.8ch' }} variant="contained" disableElevation onClick={() => props.onAdd(newProduct)}>
                            {newProduct.id != "" ? "Update product" : "Add Product"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
