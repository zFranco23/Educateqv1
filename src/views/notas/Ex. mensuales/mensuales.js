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
function Mensuales() {
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
    const urlExamenes="https://api-colegio-g12.herokuapp.com/escuela/ver-examenMensual";


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

    async function getData (examenes){
        //Cursos
        const response=await fetch(`${urlCursos}/${userId}`);
        const {alumnos,tutor:{cursos}}=await response.json();
        const arrayVacio=new Array();
        const a=new Array();

        for(let i=0;i<cursos.length;i++){
            if(!arrayVacio.includes(cursos[i].nombre)){
                a.push(cursos[i]);
            }
            arrayVacio.push(cursos[i].nombre);
        }
        const newCourses=a.map((course,i)=>({
            value: course.nombre,
            label: course.nombre,
            id: course._id
        }))
        setCursos(newCourses);
        setCursoSelected(newCourses[0].value)
        const newStudents=alumnos.map((student,i)=>({
            id:student._id,
            nombre:student.nombre,
            apellido:student.apellido
        }))

        setAlumnos(newStudents);

        const {id} = newCourses.find(curso => curso.label==newCourses[0].label);
        const exaForCourse=examenes.filter(exam => exam.curso==id);
        console.log(exaForCourse);
        const arrayData=exaForCourse.map((el,index)=>{
            const jsonData=newStudents.find(alumno=>alumno.id == el.alumno);
            jsonData.nota=el.nota;
            return jsonData;
        });
        makeData(arrayData);
    }

    async function getExaCurso(){     
        const response = await fetch(`${urlExamenes}/${userId}`);
        const {examen}= await response.json();
        setExamenes(examen);
        getData(examen);
    }

    useEffect(()=>{
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
        let arrayData=Array();
        let arrayNombre=Array();
        let c1=0,c2=0,c3=0,c4=0,c5=0;
        dataExamenes.forEach(({nombre,apellido,nota})=>{
            arrayData.push(parseFloat(nota));
            arrayNombre.push(`${nombre} ${apellido.charAt(0)}.`)
            if(nota>=0 && nota<=3){
                c1++;
            }
            if(nota>=4 && nota<=7){
                c2++;
            }
            if(nota>=8 && nota<=11){
                c3++;
            }
            if(nota>=12 && nota<=15){
                c4++;
            }
            if(nota>=16 && nota<=20){
                c5++;
            }
        })
        const bar={
            labels: ['0 - 3', '4 - 7', '8 - 11', '12 - 15', '16 - 20'],
            datasets: [
                {
                    label: 'Notas en rango',
                    backgroundColor: '#BAE617',
                    borderColor: '#8EAB22',
                    borderWidth: 1,
                    hoverBackgroundColor: '#C8C536',
                    hoverBorderColor: '98963C',
                    data: [c1, c2, c3, c4, c5],
                },
            ],
        }
        const bar_2={
            labels: arrayNombre,
            datasets: [
                {
                    label: 'Nota',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    borderWidth: 2,
                    hoverBackgroundColor: '#62D616',
                    hoverBorderColor: '98963C',
                    data: arrayData,
                    barPercentage: 0.5,
                    categoryPercentage: 1
                },
            ],
        }
        const options={
            maintainAspectRatio: false,
            responsive: true,
        }
        const pie = {
            labels: [
              'Desaprobados',
              'Aprobados',
              'Neutral',
            ],
            datasets: [
              {
                data: [desaprobados.length,aprobados.length,neutral.length],
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
        
            
            return <Grid container className={classes.container}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography style={{textAlign:"center",marginBottom:"0.5rem"}} variant="h6" > Grafico de alumno por nota </Typography>
            <CChart  style={{height:"300px"}}type="bar" datasets={bar_2.datasets} labels={bar_2.labels} options={options}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.graphic} >
                <Typography style={{textAlign:"center",marginBottom:"0.5rem"}} variant="h6" > Gr??fico de Barras</Typography>
                <CChart  style={{height:"250px"}} type="bar" datasets={bar.datasets} labels={bar.labels} options={options}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}className={classes.graphic} >
                <Typography style={{textAlign:"center",marginBottom:"0.5rem"}} variant="h6" >Resumen del salon</Typography>
                <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
            </Grid>
            </Grid>
    }
    
    const displayDesaprobados=(
        <div style={{margin:"1rem"}}>
            <CAlert color="danger">
            <span style={{fontWeight:"bold"}}>??Atenci??n!</span> Alumnos desaprobados :
            </CAlert>
        {
            <div style={{marginLeft:"2rem"}} >
                {desaprobados.map((el,index)=>(
            <Typography key={index} variant="h6">{`${el.nombre} ${el.apellido} : ${el.nota}`}</Typography>
            ))
            }
            </div>
        }
        </div>
    )
    const displayAprobados=(
        <div style={{margin:"1rem"}}>
            <CAlert color="primary">
                Alumnos que aprobaron : 
            </CAlert>
        {<div style={{marginLeft:"2rem"}}>
            {aprobados.map((el,index)=>(
            <Typography key={index} variant="h6">{`${el.nombre} ${el.apellido} : ${el.nota}`}</Typography>
        ))}
        </div> }
        </div>
    )
    const displayNeutral=(
        <div style={{margin:"1rem"}}>
            <CAlert color="warning">
                Alumnos con nota regular : 
            </CAlert>
        {
            <div style={{marginLeft:"2rem"}}>
                {neutral.map((el,index)=>(
            <Typography key={index} variant="h6">{`${el.nombre} ${el.apellido} : ${el.nota}`}</Typography>
            ))}
            </div>
        
        }
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
                title="Secci??n A - Ex??menes Mensuales"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Alumno',
                        onClick:(event,rowData)=>alert('Has elegido editar al alumno:'+rowData.nombre)
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Alumno',
                        onClick:(event,rowData)=>window.confirm('??Est??s seguro de eliminar al alumno: '+rowData.nombre+'?')
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

export default Mensuales