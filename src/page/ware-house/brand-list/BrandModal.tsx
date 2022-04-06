import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Brand } from "../../../model/Product";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddBrand: (brand: Brand) => void;
  brandUpdate: Brand;
};

export default function BrandModal(props: Props) {
  const [newBrand, setNewBrand] = useState<Brand>({...props.brandUpdate});
  
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Brand
        </Typography>
        <Box>          
          <TextField
            sx={{ width: "100%", marginTop: "20px" }}
            id="outlined-basic"
            label="Brand"
            variant="outlined"
            onChange={(e) =>
              setNewBrand({ ...newBrand, brand: e.target.value })
            }
            defaultValue={newBrand.brand}
          />
        </Box>

        <Button
          onClick={() => {
            props.onAddBrand(newBrand);
            props.handleClose()
          }}
          sx={{ width: "100%", marginTop: "20px" }}
          variant="contained"
        >
          Add brand
        </Button>
      </Box>
    </Modal>
  );
}
