import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./UserList.css";
import { Button, Stack } from "@mui/material";
import { IoAddSharp } from "react-icons/io5";
import { UserItem } from "../../../model/UserItem";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UserModal from "./UserModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  userList: UserItem[];
  onAddUser: (user: UserItem) => void;
  onUpdateUser: (user: UserItem) => void;
  onDeleteUser: (id: string) => void;
  userUpdate: UserItem;
};

export default function DataUser(props: Props) {
  return (
    <div className="data-user-list-table">
      <Stack sx={{ width: "12%", float: "right", marginTop: "30px" }}>
        <Button
          onClick={props.handleOpen}
          sx={{ padding: "8px 0px" }}
          variant="contained"
        >
          <IoAddSharp style={{ fontSize: "22px", marginRight: "5px" }} /> New
          User
        </Button>
      </Stack>

      <TableContainer sx={{ marginTop: "100px" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Full name</StyledTableCell>
              <StyledTableCell align="left">User name</StyledTableCell>
              <StyledTableCell align="left">Pass word</StyledTableCell>
              <StyledTableCell align="left">Phone number</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Postcode</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userList.map((row) => (
              <StyledTableRow key={row.user_id}>
                <StyledTableCell component="th" scope="row">
                  {row.user_id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.full_name}</StyledTableCell>
                <StyledTableCell align="left">{row.user_name}</StyledTableCell>
                <StyledTableCell align="left">{row.pass_word}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.phone_number}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>
                <StyledTableCell align="left">{row.post_code}</StyledTableCell>
                <StyledTableCell align="left">{row.role}</StyledTableCell>
                <StyledTableCell align="center" className="icon-action-user">
                  <FaEdit
                    onClick={() => {
                      props.onUpdateUser(row);
                      props.handleOpen();
                    }}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  <RiDeleteBin6Line
                    onClick={() => {
                      props.onDeleteUser(row.user_id);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserModal key={props.userUpdate.user_id}
        onAddUser={props.onAddUser}
        open={props.open}
        handleOpen={props.handleOpen}
        handleClose={props.handleClose}
        userUpdate={props.userUpdate}/>
    </div>
  );
}
