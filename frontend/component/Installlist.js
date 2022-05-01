import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "@fortawesome/fontawesome-svg-core/styles.css";
const center = {
  display: "flex",
  "justifyContent": "center",
  "alignItems": "center",
};

export const Installlist = ({install,myfunc}) => { 
  return(
    <div>
      {console.log(install)}
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>วันที่ต้องผ่อนชำระ</TableCell>
            <TableCell >ชื่อรายการ</TableCell>
            <TableCell >สถานะ</TableCell>
            <TableCell >จำนวนเงิน    </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {install.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>myfunc(row)}
            >
              <TableCell component="th" scope="row">
                {row.payment_day}
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.status}</TableCell>
              <TableCell >{row.next_pay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

);
}