import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Brand } from "../../../model/Product";
import { UserItem } from "../../../model/UserItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50%',
  background: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onAddUser: (user: UserItem) => void;
  userUpdate: UserItem;
};

export default function UserModal(props: Props) {
  const [newUser, setNewUser] = useState<UserItem>({ ...props.userUpdate });

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
        <Box marginTop={'10px'}>
          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, full_name: e.target.value })
            }
            defaultValue={newUser.full_name}
          />

          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            label="User name"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, user_name: e.target.value })
            }
            defaultValue={newUser.user_name}
          />

          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, pass_word: e.target.value })
            }
            defaultValue={newUser.pass_word}
          />

          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            type={'number'}
            label="Phone number"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, phone_number: Number(e.target.value) })
            }
            defaultValue={newUser.phone_number}
          />

          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
            defaultValue={newUser.email}
          />

          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
            defaultValue={newUser.address}
          />

          <TextField
            sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}
            id="outlined-basic"
            label="Postcode"
            variant="outlined"
            onChange={(e) =>
              setNewUser({ ...newUser, post_code: e.target.value })
            }
            defaultValue={newUser.post_code}
          />

          <FormControl sx={{ width: "46%", marginTop: "20px", margin: '10px 10px' }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select              
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newUser.role}
              label="Role"
              onChange={e => setNewUser({...newUser, role: e.target.value})}
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          onClick={() => {
            props.onAddUser(newUser);
            props.handleClose();
          }}
          sx={{ width: "96.5%", marginTop: "20px" }}
          variant="contained"
        >
          Add user
        </Button>
      </Box>
    </Modal>
  );
}
