import React, { useState,useEffect,useContext } from 'react';
import MaterialTable from 'material-table';
import {CChart, CChartLine} from '@coreui/react-chartjs'
import Typography from '@material-ui/core/Typography'
import { Grid, CircularProgress , makeStyles,TextField, MenuItem} from '@material-ui/core';
import BackContext from 'src/Provider/BackContext';
import { CAlert, CButton, CCard,CCardBody,CCardHeader } from '@coreui/react';

import CloseIcon from '@material-ui/icons/Close';



const styles_2=makeStyles({
    container:{
        marginTop: "1rem",
        marginBottom:"1rem"
    }
    
})


function Semanales() {
    
    const {userId}=useContext(BackContext);

    const classes=styles_2();

    const [idCurso,setIdCurso]=useState("");
    const [semanaSelected,setSemanaSelected]=useState("");
    const [numSem,setNumSem]=useState("");
    const [alumnos,setAlumnos]=useState([]);

    //Cursos traidos de la bd
    const [cursos,setCursos]=useState([]);
    //Todos los examenes que existen del profesor
    const [examenes,setExamenes]=useState([]);
    //Examen filtrado del curso 
    const [exaCurso,setExaCurso]=useState([]);
    const [cursoSelected,setCursoSelected]=useState("");
    const [dataExamenes,setDataExamenes]=useState([]);
    const [promNotas,setPromNotas]=useState([]);
    const [alumnMax,setAlumnMax]=useState(null);
    const [alumnMin,setAlumnMin]=useState({});
    const [arrayNotasMax,setArrayNotasMax]=useState([]);
    const [arrayNotasMin,setArrayNotasMin]=useState([]);
    /*Graficas*/
    const [neutral, setNeutral] = useState([]);
    const [aprobados, setAprobados] = useState([]);
    const [desaprobados, setDesaprobados] = useState([]);

    const [visible,setVisible]=useState(false);
    const urlCursos="https://api-colegio-g12.herokuapp.com/escuela/buscar-alumnos-del-tutor";
    const urlExamenes="https://api-colegio-g12.herokuapp.com/escuela/ver-examenSemanal";


    

    const semana=[
        { label: "Semana 1", value : "Semana 1"},
        { label: "Semana 2", value : "Semana 2"},
        { label: "Semana 3", value : "Semana 3"},
        { label: "Semana 5", value : "Semana 5"},
        { label: "Semana 6", value : "Semana 6"},
        { label: "Semana 7", value : "Semana 7"},
    ]
    function setearRangos(){
        setPromNotas([]);
        setAlumnMax({});
        setAlumnMin({});
    }

    const handleChange=(e)=>{
        
        const sem=e.target.value;
        setSemanaSelected(sem);
        const numSem=sem.substring(sem.length-1,sem.length)
        setNumSem(numSem);

        //Filtrar de nuevo para el cambio de semana :
        const filterSem= examenes.filter(el => el.curso==idCurso && el.semana==numSem);
        setExaCurso(filterSem);
        //setExaCurso(filterSem);
         const arrayData=filterSem.map((el,index)=>{
            const jsonData=alumnos.find(alumno=>alumno.id == el.alumno);
            jsonData.nota=el.nota;
            return jsonData;
        });
        makeData(arrayData);
        
    }

    const handleCursoExamen=(e)=>{
        setearRangos();
        const sem=e.target.value;
        setCursoSelected(sem);
        const {id} = cursos.find(curso => curso.label==e.target.value);  
        setIdCurso(id);
        const exaForCourse=examenes.filter(exam => exam.curso==id && exam.semana==numSem);
        setExaCurso(exaForCourse);

        const arrayData=exaForCourse.map((el,index)=>{
            const jsonData=alumnos.find(alumno=>alumno.id == el.alumno);
            jsonData.nota=el.nota;
            return jsonData;
        });
        makeData(arrayData); 
        getStudent(id); 
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
          setCursoSelected(newCourses[0].value);
        
          const newStudents=alumnos.map((student,i)=>({
            id:student._id,
            nombre:student.nombre,
            apellido:student.apellido
          }))

            setAlumnos(newStudents);

          //Asignar el curso para mostrarse por primera vez

        const {id} = newCourses.find(curso => curso.label==newCourses[0].label);
        setIdCurso(id);
        //console.log(examenes);
        const exaForCourse=examenes.filter(exam => exam.curso==id && exam.semana=="1") ;
        //console.log(exaForCourse);
        setExaCurso(exaForCourse);

        const arrayData=exaForCourse.map((el,index)=>{
            const jsonData=newStudents.find(alumno=>alumno.id == el.alumno);
            jsonData.nota=el.nota;
            return jsonData;
        });
        makeData(arrayData);   
    }

    async function getExaCurso(){   
        setSemanaSelected("Semana 1");
        setNumSem("1");
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
    //Hallar el mas bajito

    function getStudent(id){
        setVisible(true);
        let arrayData=new Array();
        let promNotas=new Array();
        let arrayArrayNotas=new Array();
        const arraySemanas=["1","2","3","5","6","7"];
        arraySemanas.forEach((semana)=>{
            const a=examenes.filter(exam => exam.curso==id && exam.semana==semana);
            arrayData.push(a)
            //POS 0 ->SEMANA 1()
            //POS 1-> SEMENA 2
        })
        //Para cada alumno
        if(alumnos.length>0 && examenes.length>0){
            let suma;
            let b;
            alumnos.forEach(({id})=>{
                //Recorrer ahora el array de examenes en cada semana
                suma=0;
                b=new Array();
                //6 veces
                arrayData.forEach((arraySemana)=>{
                    //Accedemos a cada los examenes en el cual solo aparecerá 1 vez
                    const jsonNota=arraySemana.find(examen => examen.alumno == id );
                    suma+=jsonNota.nota;
                    b.push(jsonNota.nota);
                    //console.log(jsonNota);
                })
                arrayArrayNotas.push(b);
                promNotas.push(suma/6);
            })
            const indexBueno=promNotas.indexOf((Math.max.apply(null,promNotas)));
            const indexMalo=promNotas.indexOf((Math.min.apply(null,promNotas)));
            setAlumnMax(alumnos[indexBueno]);
            setAlumnMin(alumnos[indexMalo]);
            setArrayNotasMax(arrayArrayNotas[indexBueno]);
            setArrayNotasMin(arrayArrayNotas[indexMalo]);
            setPromNotas(promNotas);
        }
        
    }
    /**GRAFICO */
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
        
            
            return (<Grid container className={classes.container}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography style={{textAlign:"center",marginBottom:"0.5rem"}} variant="h6" > Grafico de alumno por nota </Typography>
                <CChart  style={{height:"300px"}}type="bar" datasets={bar_2.datasets} labels={bar_2.labels} options={options}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.graphic} >
                <Typography style={{textAlign:"center",marginBottom:"0.5rem"}} variant="h6" > Gráfico de Barras</Typography>
                <CChart  type="bar" datasets={bar.datasets} labels={bar.labels} options={options}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}className={classes.graphic} >
                <Typography style={{textAlign:"center",marginBottom:"0.5rem"}} variant="h6" >Resumen del salon</Typography>
                <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
            </Grid>
            </Grid> )
    }
    const displayDesaprobados=(
        <div style={{margin:"1rem"}}>
            <CAlert color="danger">
            <span style={{fontWeight:"bold"}}>¡Atención!</span> Alumnos desaprobados :
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
             <TextField 
                style={{marginLeft:"1rem"}}
                id="standard-select-currency"
                select
                label="Semana"
                value={semanaSelected}
                onChange={handleChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Seleccione semana"
                variant="outlined"
            >
                {semana.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
                ))}
            </TextField> 
            
            {
                <MaterialTable
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
                />
            }
            <CCard style={{marginTop:"1rem"}}>
                <CCardHeader style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                    <Typography variant="h6">Cuadro de mérito</Typography>
                    <CButton style={{marginLeft:"1rem"}}color="info" variant="outline" onClick={()=>getStudent(idCurso)}>Traer Datos</CButton>
                    {visible && <CloseIcon style={{marginLeft:"1rem"}} onClick={()=>setVisible(false)}/>}
                </CCardHeader>
                {(visible && alumnMax && arrayNotasMax) && <CCardBody>
                    <Typography variant="h6" color="error" >Alumno con menor rendimiento : {`${alumnMin.nombre} ${alumnMin.apellido}`}</Typography>
                    <Typography variant="h6">Alumno con mayor rendimiento : {`${alumnMax.nombre} ${alumnMax.apellido}`}</Typography>
                    <CChartLine
                        datasets={[
                        {
                            label: `${alumnMin.nombre}`,
                            backgroundColor: 'rgb(228,102,81,0.9)',
                            data: arrayNotasMin
                        },
                        {
                            label: `${alumnMax.nombre}`,
                            backgroundColor: 'rgb(0,216,255,0.9)',
                            data: arrayNotasMax
                          }

                        ]}
                        labels="meses"
                    />
                </CCardBody>}
            </CCard>
            
            {dataExamenes?.length && displayCharts()}

            {desaprobados?.length>0 && displayDesaprobados}
            {aprobados?.length>0 && displayAprobados}
            {neutral?.length>0 && displayNeutral}
        
        </div>
    )
}

export default Semanales