import React, { useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import {makeStyles, Alert, Grid,Typography,CircularProgress, TextField} from '@material-ui/core';
import {CChart} from '@coreui/react-chartjs'
import BackContext from 'src/Provider/BackContext';
import { CAlert } from '@coreui/react';


const styles=makeStyles({
    container:{
        marginTop: "1rem",
        marginBottom:"1rem"
    }
    
})
function Bimestrales() {
    const classes=styles();
    const [alumnos,setAlumnos]=useState([]);
    const [cursos,setCursos]=useState([]);
    const [examenes,setExamenes]=useState([]);
    const [exaCurso,setExaCurso]=useState([]);
    const [cursoSelected,setCursoSelected]=useState("");
    const [dataExamenes,setDataExamenes]=useState([]);

    /*Graficas*/
    const [neutral, setNeutral] = useState([]);
    const [aprobados, setAprobados] = useState([]);
    const [desaprobados, setDesaprobados] = useState([]);


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
        setDataExamenes(newData)
        const cantNeutral=newData.filter(examen=>examen.nota==11);
        const cantAprobados =newData.filter(examen=>examen.nota>11);
        const cantDesaprobados= newData.filter((examen)=>examen.nota < 11);

        setNeutral(cantNeutral);
        setAprobados(cantAprobados);
        setDesaprobados(cantDesaprobados);
        
        
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

    /**Graficos */
    
    function displayCharts(){
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
              'Neutral',
              'Desaprobados',
              'Aprobados',
            ],
            datasets: [
              {
                data: [neutral.length,aprobados.length,desaprobados.length],
                backgroundColor: [
                  '#FF6384',
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
        
            
            return <Grid container className={classes.container}>
            <Grid item xs={12} sm={12} md={6} className={classes.graphic} >
                <Typography variant="h6" > Gráfico de Barras</Typography>
                <CChart  type="bar" datasets={bar.datasets} labels="months" options={options}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}className={classes.graphic} >
                <Typography variant="h6" >Resumen del salon</Typography>
                <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
            </Grid>
            </Grid>
    }
    const displayDesaprobados=(
        <div style={{margin:"1rem"}}>
            <CAlert color="danger">
            <span style={{fontWeight:"bold"}}>¡Atención!</span> Alumnos desaprobados :
            </CAlert>
        {desaprobados.map((el)=>(
            <Typography variant="h6">{`${el.nombre} ${el.apellido} : ${el.nota}`}</Typography>
        ))}
        </div>
    )
    const displayAprobados=(
        <div style={{margin:"1rem"}}>
            <CAlert color="primary">
                Alumnos que aprobaron : 
            </CAlert>
        {aprobados.map((el)=>(
            <Typography variant="h6">{`${el.nombre} ${el.apellido} : ${el.nota}`}</Typography>
        ))}
        </div>
    )
    const displayNeutral=(
        <div style={{margin:"1rem"}}>
            <CAlert color="warning">
                Alumnos con nota regular : 
            </CAlert>
        {neutral.map((el)=>(
            <Typography variant="h6">{`${el.nombre} ${el.apellido} : ${el.nota}`}</Typography>
        ))}
        </div>
    )
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
            <MaterialTable
                columns={columns}
                data={dataExamenes}
                title="Sección A - Exámenes Mensuales"
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
                /> 
          
            {dataExamenes?.length && displayCharts()}

            {desaprobados?.length>0 && displayDesaprobados}
            {aprobados?.length>0 && displayAprobados}
            {neutral?.length>0 && displayNeutral}
            
        </div>
    )
}

export default Bimestrales