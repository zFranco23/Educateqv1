import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


/* const cursos=[
  {
    nombre:"Trigonometria",
    dia:"Lunes",
    cant_horas:4,
    hora_ini:8,
  },
  {
    nombre:"Historia del Perú",
    dia:"Lunes",
    cant_horas:2,
    hora_ini:13,
  },
  {
    nombre:"Geografia",
    dia:"Martes",
    cant_horas:2,
    hora_ini:8,
  },
  {
    nombre:"Literatura",
    dia:"Martes",
    cant_horas:2,
    hora_ini:10,
  },
  {
    nombre:"Geometria",
    dia:"Martes",
    cant_horas:2,
    hora_ini:13,
  },
  {
    nombre:"Química",
    dia:"Miercoles",
    cant_horas:2,
    hora_ini:8,
  },
  {
    nombre:"Historia Universal",
    dia:"Miercoles",
    cant_horas:2,
    hora_ini:10,
  },
  {
    nombre:"Biologia",
    dia:"Miercoles",
    cant_horas:2,
    hora_ini:13,
  },
  {
    nombre:"Fisica",
    dia:"Jueves",
    cant_horas:2,
    hora_ini:8,
  },
  {
    nombre:"Psicologia",
    dia:"Jueves",
    cant_horas:1,
    hora_ini:10,
  },
  {
    nombre:"Filosofia",
    dia:"Jueves",
    cant_horas:1,
    hora_ini:11,
  },
  {
    nombre:"Razonamiento Verbal",
    dia:"Jueves",
    cant_horas:2,
    hora_ini:13,
  },
  {
    nombre:"Razonamiento Matemático",
    dia:"Viernes",
    cant_horas:4,
    hora_ini:8,
  },
  {
    nombre:"Aritmetica",
    dia:"Viernes",
    cant_horas:2,
    hora_ini:13,
  },
  {
    nombre:"Civica",
    dia:"Sabado",
    cant_horas:2,
    hora_ini:8,
  },
  {
    nombre:"Ingles",
    dia:"Sabado",
    cant_horas:2,
    hora_ini:10,
  },
  {
    nombre:"Educacion Fisica",
    dia:"Sabado",
    cant_horas:2,
    hora_ini:13,
  },


]
 */



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
  
/*  const rows = [
    createData('8:00-9:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasd','asdas'),
    createData('9:00-10:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasd','asdas'),
    createData('10:00-11:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasdasd','asd'),
    createData('11:00-12:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasda','asdas'),
    createData('12:00-13:00', 'R', 'E', 'C', 'R','E','O'),
    createData('13:00-14:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','asdasdasd','asdas'),
    createData('14:00-15:00', 'asdasd', 'asdasd', 'asdasd', 'asdasd','sadasdasd','asdas'),
 ];  */
  
const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
});

function Horario(){
    /* nombre,dia,cant_horas,hora_ini */
    const [data,setData]=useState([]);
    let rows=Array();

    async function getData(){
      const res= await fetch("https://api-colegio-g12.herokuapp.com/escuela/buscar-tutor/6076155acd901b001503a331");
      //const res= await fetch("https://api-colegio-g12.herokuapp.com/escuela/buscar-tutor/607625b1cd901b001503a346");
      const {user} = await res.json();
      const {cursos} = user;

      const newData=cursos.map((curso,index)=>(
        {
          nombre:curso.nombre,
          dia:curso.dia,
          cant_horas:curso.horas,
          hora_ini:curso.hora_ini
        }
      ))
      setData(newData);
    }

    const createRows=()=>{
      let lunes,martes,miercoles,jueves,viernes,sabado;
      for(let i=8;i<15;i++){
        if(i==12){
          rows.push(createData('12:00-13:00', 'R', 'E', 'C', 'R','E','O'));
        }
        else{
          data.forEach((curso,index)=>{
            if(curso.dia=="Lunes" && (curso.hora_ini==i || curso.hora_ini<i)){
              lunes=curso.nombre;
            }
            if(curso.dia=="Martes" && (curso.hora_ini==i || curso.hora_ini<i)){
              martes=curso.nombre;
            }
            if(curso.dia=="Miercoles" && (curso.hora_ini==i || curso.hora_ini<i)){
              miercoles=curso.nombre;
            }
            if(curso.dia=="Jueves" && (curso.hora_ini==i || curso.hora_ini<i)){
              jueves=curso.nombre;
            }
            if(curso.dia=="Viernes" && (curso.hora_ini==i || curso.hora_ini<i)){
              viernes=curso.nombre;
            }
            if(curso.dia=="Sabado" && (curso.hora_ini==i || curso.hora_ini<i)){
              sabado=curso.nombre;
            }
          })
          rows.push(createData(`${i}:00-${i+1}:00`,lunes,martes,miercoles,jueves,viernes,sabado));
        }
       
      }
      console.log(rows);
    }
    createRows();

    useEffect(()=>{
      getData();
    },[])
    
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
              <StyledTableCell align="center"component="th" scope="row">
                <span>{row.name}</span>
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