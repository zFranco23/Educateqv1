import React, { useState,useEffect,useContext } from 'react';
import MaterialTable from 'material-table';
import {CChart} from '@coreui/react-chartjs'
import Typography from '@material-ui/core/Typography'
import { Grid, CircularProgress , makeStyles,TextField} from '@material-ui/core';
import BackContext from 'src/Provider/BackContext';


const styles_2=makeStyles({
    container:{
        marginTop: "1rem",
        marginBottom:"1rem"
    }
    
})

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    },
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
  }));


function Semanales() {
    const styles=useStyles();
    const classes=styles_2();
    const [alumnos,setAlumnos]=useState([]);
    const [cursos,setCursos]=useState([]);
    const [examenes,setExamenes]=useState([]);
    const [exaCurso,setExaCurso]=useState([]);
    const [cursoSelected,setCursoSelected]=useState("");
    const [dataExamenes,setDataExamenes]=useState([]);

    const urlCursos="https://api-colegio-g12.herokuapp.com/escuela/buscar-alumnos-del-tutor";
    const urlExamenes="https://api-colegio-g12.herokuapp.com/escuela/ver-examenBimestral";


    const {userId}=useContext(BackContext);



    const handleCursoExamen=(e)=>{
        setCursoSelected(e.target.value);
        const {id} = cursos.find(curso => curso.label==e.target.value);  
        const exaForCourse=examenes.filter(exam => exam.curso==id);
        setExaCurso(exaForCourse);
        const arrayData=exaForCourse.map((el,index)=>{
            const jsonData=alumnos.find(alumno=>alumno.id == el.alumno);
            jsonData.nota=el.nota;
            return jsonData;
        });
        makeData(arrayData);  
    }

    const makeData= (arrayData) =>{
        const newData= arrayData.map(({nombre,apellido,nota},i)=>(
            {
                orden : i+1,
                nombre,
                apellido,
                nota
            }
        ))
        setDataExamenes(newData);
    }
    const changeData = (courses) =>{
        const newCourses=courses.map((course,i)=>({
            value: course.nombre,
            label: course.nombre,
            id: course._id
        }))
        setCursos(newCourses);
    }
    const changeDataAlumnos = (students) => {
        const newStudents=students.map((student,i)=>({
            id:student._id,
            nombre:student.nombre,
            apellido:student.apellido
        }))

        setAlumnos(newStudents);
    }

    async function getData (){
        //Cursos
        const response=await fetch(`${urlCursos}/${userId}`);
        const {alumnos,tutor:{cursos}}=await response.json();
        changeData(cursos);
        changeDataAlumnos(alumnos);
    }

    async function getExaCurso(){     
        const response = await fetch(`${urlExamenes}/${userId}`);
        const {examen}= await response.json();
        setExamenes(examen);
    }

    useEffect(()=>{
        getData();
        getExaCurso();
    },[])

    const columns=[
        {
            title:'Nro. Orden',
            field:'orden',
            type:"numeric"
        },
        {
            title:'Apellidos',
            field:'apellido'
        },
        {
            title:'Nombres',
            field:'nombre'
        },
        {
            title:'Nota',
            field:'nota',
            type:"numeric"
        }
    ];

    /**GRAFICO */

    const bar={
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [0, 5, 10, 15, 20],
            },
        ],
    }
    const options={
        maintainAspectRatio: false,
        responsive: true
    }

    const pie = {
        labels: [
          'Desaprobados',
          'Aprobados',
          'Neutral',
        ],
        datasets: [
          {
            data: [20, 50, 100],
            backgroundColor: [
              '#FC0404',
              '#36A2EB',
              '#FFCE56',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          }],
    };

    return (
        <div style={{ maxWidth: "100%" }}>
            {cursos?.length ? (<TextField
                id="outlined-select-currency-native"
                select
                label="Curso"
                value={cursoSelected}
                onChange={handleCursoExamen}
                SelectProps={{
                    native: true,
                }}
                helperText="Seleccione un Curso"
                variant="outlined"
                style={{marginBottom:"1rem"}}
            >
                { cursos.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </TextField>) :<CircularProgress size={50}/> }
            {/* <TextField 
                className={styles.inputMaterial} 
                id="standard-select-currency"
                select
                label="Semana"
                value={asistencia}
                onChange={handleChange}
                helperText="Seleccione el tipo de Asistencia"
            >
                {tipoAsistencia.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                ))}
            </TextField> */}
            
            {
                dataExamenes?.length  ? (<MaterialTable
                columns={columns}
                data={dataExamenes}
                title="Sección A - Exámenes Semanales"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Alumno',
                        onClick:(event,rowData)=>alert('Has elegido editar al alumno:'+rowData.nombre)
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Alumno',
                        onClick:(event,rowData)=>window.confirm('¿Estás seguro de eliminar al alumno: '+rowData.nombre+'?')
                    }

                ]}
                options={{
                    actionsColumnIndex:-1
                }}
                localization={{
                    header:{
                        actions:'Acciones'
                    }
                }}
                /> ) : <div></div>
            }
            
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={12} md={6} className={classes.graphic} >
                    <Typography variant="h6" > Gráfico de Barras</Typography>
                    <CChart  type="bar" datasets={bar.datasets} labels="months" options={options}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}className={classes.graphic} >
                    <Typography variant="h6" >Paleta</Typography>
                    <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
                </Grid>
            </Grid>

        
        </div>
    )
}

export default Semanales