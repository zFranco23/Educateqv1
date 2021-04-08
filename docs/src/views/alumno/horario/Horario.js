import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

function createData(name, lunes, martes, miercoles, jueves, viernes, sabado) {
    return { name, lunes,martes, miercoles, jueves, viernes, sabado };
  }
  
const rows = [
    createData('8:00-9:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasd','asdas'),
    createData('9:00-10:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasd','asdas'),
    createData('10:00-11:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasdasd','asd'),
    createData('11:00-12:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasda','asdas'),
    createData('12:00-13:00', 'R', 'E', 'C', 'R','E','O'),
    createData('13:00-14:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasdasd','asdas'),
    createData('14:00-15:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','sadasdasd','asdas'),
 ];
  
const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
});

function Horario(){

    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Hora</StyledTableCell>
            <StyledTableCell align="center">Lunes</StyledTableCell>
            <StyledTableCell align="center">Martes</StyledTableCell>
            <StyledTableCell align="center">Miércoles</StyledTableCell>
            <StyledTableCell align="center">Jueves</StyledTableCell>
            <StyledTableCell align="center">Viernes</StyledTableCell>
            <StyledTableCell align="center">Sábado</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.lunes}</StyledTableCell>
              <StyledTableCell align="center">{row.martes}</StyledTableCell>
              <StyledTableCell align="center">{row.miercoles}</StyledTableCell>
              <StyledTableCell align="center">{row.jueves}</StyledTableCell>
              <StyledTableCell align="center">{row.viernes}</StyledTableCell>
              <StyledTableCell align="center">{row.sabado}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Horario;