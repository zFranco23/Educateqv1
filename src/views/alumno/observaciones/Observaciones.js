import React, { useContext, useEffect,useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CButton } from '@coreui/react';
import BackContext from '../../../Provider/BackContext';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';
import { AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Observaciones() {


  const url="https://api-colegio-g12.herokuapp.com/escuela/buscar-alumnos-del-tutor";

  const urlObservaciones="https://api-colegio-g12.herokuapp.com/escuela/guardar-observacion";

  const urlTraerObservaciones="https://api-colegio-g12.herokuapp.com/escuela/observacion-alumno";

  const {userId}=useContext(BackContext);

  /* const url_insert=`${urlObservaciones}`; */

  const classes = useStyles();
  /*Alerts*/
  const [success,setSuccess]=useState(false);
  const [successActu,setSuccessActu]=useState(false);
  const [cantZero,setCantZero]=useState(false);
  const [successDelete,setSuccessDelete]=useState(false);
  const [errorActu,setErrorActu]=useState(false);
  const [errorDelete,setErrorDelete]=useState(false);
  const [errorInsert,setErrorInsert]=useState(false);

  const [dataAlumno,setdataAlumno]=useState([]);
  const [curso, setCurso] = useState("");
  const [cursos,setCursos]=useState([]);
  const [observaciones,setObservaciones]=useState([])
  const [observacion,setObservacion]=useState("");
  const [alumnoInsertar,setAlumnoInsertar]=useState({});
  const [dataInsertar,setDataInsertar]=useState("");
  const [cursoInsertar,setCursoInsertar]=useState("")
  const [idObservacion,setIdObservacion]=useState("");
  const [hasObservation,setHasObservation]=useState(false);


  const handleObservacion = (event) => {
    const obs=event.target.value;
    setObservacion(event.target.value);
    if(obs.length<1){
      setCantZero(true);
    }else{
      setCantZero(false);
    }
  };

  const handleCurso = (event) => {
    cleanData();
    setCurso(event.target.value);
    const {id}= cursos.find(el => el.label ==event.target.value);
    setCursoInsertar(id);
    traerObservaciones(id);
  }
  const cleanAlerts= () =>{
    setErrorDelete(false);
    setSuccessDelete(false);
    setSuccessActu(false);
    setErrorActu(false);
    setErrorInsert(false);
    setSuccess(false);
    setCantZero(false);
  }
  const setearAlumno = (data) =>{
    traerObservaciones(cursoInsertar);
    cleanAlerts();
    setSuccess(false);
    
    setAlumnoInsertar({nombre:data.nombre,apellido:data.apellido});
    const student=dataAlumno.find(al => al.orden==data.orden);
    setDataInsertar(student.id);

    const obsAlumno= observaciones.find(el => el.alumno == student.id);
    if(obsAlumno){
      setHasObservation(true);
      setObservacion(obsAlumno.descripcion)
      setIdObservacion(obsAlumno._id);
    }else{
      setSuccessDelete(false);
      setHasObservation(false);
      setObservacion("");
      setIdObservacion("");
    }
    
  }

  const deleteObs = async()=>{
    try{
        const {data}=await axios.delete("https://api-colegio-g12.herokuapp.com/escuela/eliminar-observacion",
        {
            data :{
                observacionId:idObservacion
            }
        }
        )
      if(data.ok){
        cleanData();
        setHasObservation(false);
        setSuccessDelete(true);
      }
    }catch(e){
      setErrorDelete(true);
    }
    
  }
  const traerObservaciones = async (id) =>{

    const response=await fetch(`${urlTraerObservaciones}/${userId}/${id}`);
    const {observacion}=await response.json();

    setObservaciones(observacion);

  }

  const resetearAlumno = () =>{
    setSuccessActu(false);
    setErrorActu(false);
    setErrorInsert(false);
    setSuccess(false);
    setCantZero(false);
    setAlumnoInsertar({});
  }

  const cleanData= () =>{
    cleanAlerts();
    setDataInsertar("");
    setObservacion("");
    setAlumnoInsertar({});
  }
  const postData= async () => {
    if(observacion.length <1){
      setCantZero(true);
    }else{
        if(!hasObservation){
          try {
            const {data}=await axios({
                method: "POST",
                url: urlObservaciones,
                data : {
                  descripcion:observacion,
                  alumno:dataInsertar,
                  curso:cursoInsertar,
                  IdUser:userId
                }
              })
              if(data.ok){
                cleanData();
                setSuccess(true);
              }
            
        } catch (error) {
            setErrorInsert(true);
        }
      }else{
        try{
          const {data} = await axios.put('https://api-colegio-g12.herokuapp.com/escuela/actualizar-observacion', {
                  observacionId:idObservacion,
                  descripcion:observacion 
          });
          if(data.ok){
            cleanData();
            setSuccessActu(true);
          }
          
        }catch(error){
          setErrorActu(true);
        }
      }
    }

    
    
}

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
        }
    ]

    async function getData(){
      const response=await fetch(`${url}/${userId}`);
      const {tutor:{cursos},alumnos}=await response.json();
      const newData=alumnos.map((alumno,index)=>(
          {
              id:alumno._id,
              orden:index+1,
              apellido:alumno.apellido,
              nombre:alumno.nombre,
          }
      ))
      setdataAlumno(newData);

      const arrayVacio=new Array();
        const a=new Array();

        for(let i=0;i<cursos.length;i++){
            if(!arrayVacio.includes(cursos[i].nombre)){
                a.push(cursos[i]);
            }
            arrayVacio.push(cursos[i].nombre);
        }
      
      //courses = a 
      const newCourses=a.map((course,i)=>({
        value: course.nombre,
        label: course.nombre,
        id: course._id
      }))
      setCursos(newCourses);
      setCurso(newCourses[0].value);
      const {id}= newCourses.find(el => el.label == newCourses[0].value);
      setCursoInsertar(id);
    }

    useEffect(()=>{
      getData();
    },[])

    return (
        <div style={{ maxWidth: "100%"}}>
          <TextField
                id="outlined-select-currency-native"
                select
                value={curso}
                onChange={handleCurso}
                SelectProps={{
                    native: true,
                }}
                helperText="Seleccione un Curso"
                variant="outlined"
            >
                {cursos.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
                ))}
            </TextField><br/><br/>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
          <MaterialTable
                columns={columns}
                data={dataAlumno}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Observación',
                        onClick:(event,rowData)=>setearAlumno(rowData)
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Observación',
                        onClick:(event,rowData)=>resetearAlumno()
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
            <div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",alignItems:"center",paddingBottom:"4rem",justifyContent:"space-evenly"}}>
              {alumnoInsertar?.nombre &&  <Typography variant="h6">Editando a : {`${alumnoInsertar.nombre} ${alumnoInsertar.apellido}`}</Typography>}
              { errorInsert &&  <Alert variant="outlined" severity="error"><AlertTitle>Error</AlertTitle><strong>No se pudo registrar la observación.</strong> </Alert>}
              { successActu &&  <Alert variant="outlined" severity="success"><AlertTitle>Correcto</AlertTitle><strong>Se actualizó correctamente la observación.</strong> </Alert>}
              { errorDelete &&  <Alert variant="outlined" severity="error"><AlertTitle>Error</AlertTitle><strong>No se pudo eliminar la observación.</strong> </Alert>}
              { errorActu &&  <Alert variant="outlined" severity="error"><AlertTitle>Error</AlertTitle><strong>No se pudo actualizar la observación.</strong> </Alert>}
              { cantZero &&  <Alert variant="outlined" severity="warning"><AlertTitle>Atención</AlertTitle><strong>La observación no deberia estar vacia...</strong> </Alert>}
              { successDelete  && <Alert variant="outlined"severity="success"><AlertTitle>Correcto</AlertTitle><strong>Se eliminó la observación</strong></Alert>}
              { success  && <Alert variant="outlined"severity="success"><AlertTitle>Correcto</AlertTitle><strong>Se registró correctamente la observación</strong></Alert>}
              <TextField
                
                  id="outlined-multiline-static"
                  label="Observación"
                  value={observacion}
                  style={{width:'350px'}}
                  multiline
                  rows={8}
                  variant="outlined"
                  onChange={handleObservacion}
              />
              <div style={{display:"flex",justifyContent:""}}>
                <CButton color="success" onClick={postData}>{hasObservation? "Actualizar" : "Guardar" }</CButton>
                <CButton style={{marginLeft:"1rem"}} color="primary" onClick={cleanData}>Cancelar</CButton>
                {hasObservation && <CButton style={{marginLeft:"1rem"}} color="danger" onClick={deleteObs}>Eliminar</CButton>}
              </div>
              
            </div>
            
          </div>
          
            
        </div>
    )
}

export default Observaciones
