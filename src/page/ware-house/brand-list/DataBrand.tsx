import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./BrandList.css";
import { Brand } from "../../../model/Product";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IoAddSharp } from "react-icons/io5";
import BrandModal from "./BrandModal";

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
  brandList: Brand[];
  onAddBrand: (brand: Brand) => void;
  onUpdateBrand: (brand: Brand) => void;
  onDeleteBrand: (id: string) => void;
  brandUpdate: Brand;
};

export default function DataBrand(props: Props) {  
  return (
    <div className="data-brand-list-table">
      <Stack sx={{ width: "12%", float: "right", marginTop: "30px" }}>
        <Button
          onClick={props.handleOpen}
          sx={{ padding: "8px 0px" }}
          variant="contained"
        >
          <IoAddSharp style={{ fontSize: "22px", marginRight: "5px" }} /> New
          Brand
        </Button>
      </Stack>

      <TableContainer sx={{ marginTop: "100px" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={"35%"}>ID</StyledTableCell>
              <StyledTableCell width={"32%"} align="left">
                Brand
              </StyledTableCell>
              <StyledTableCell width={"33%"} align="center">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.brandList.map((row) => (
              <StyledTableRow key={row.brand_id}>
                <StyledTableCell align="left">{row.brand_id}</StyledTableCell>
                <StyledTableCell align="left">{row.brand}</StyledTableCell>
                <StyledTableCell className="icon-action-brand" align="center">
                  <FaEdit
                    onClick={() => {
                      props.onUpdateBrand(row);
                      props.handleOpen()
                    }}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  <RiDeleteBin6Line onClick={() => {
                      props.onDeleteBrand(row.brand_id)
                  }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BrandModal
        key={props.brandUpdate.brand_id}
        onAddBrand={props.onAddBrand}
        open={props.open}
        handleOpen={props.handleOpen}
        handleClose={props.handleClose}
        brandUpdate={props.brandUpdate}
      />
    </div>
  );
}
