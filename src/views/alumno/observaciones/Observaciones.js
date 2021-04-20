import React, { useContext, useEffect,useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CButton } from '@coreui/react';
import BackContext from '../../../Provider/BackContext';
import { Typography } from '@material-ui/core';

import axios from 'axios';

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
    setObservacion(event.target.value);
  };

  const handleCurso = (event) => {
    setCurso(event.target.value);
    const {id}= cursos.find(el => el.label ==event.target.value);
    setCursoInsertar(id);
    traerObservaciones(id);
  }

  const setearAlumno = (data) =>{
    traerObservaciones(cursoInsertar);
    setAlumnoInsertar({nombre:data.nombre,apellido:data.apellido});
    const student=dataAlumno.find(al => al.orden==data.orden);
    setDataInsertar(student.id);

    const obsAlumno= observaciones.find(el => el.alumno == student.id);
    if(obsAlumno){
      setHasObservation(true);
      setObservacion(obsAlumno.descripcion)
      setIdObservacion(obsAlumno._id);
    }else{
      setHasObservation(false);
      setObservacion("");
      setIdObservacion("");
    }
    
  }


  const traerObservaciones = async (id) =>{

    const response=await fetch(`${urlTraerObservaciones}/${userId}/${id}`);
    const {observacion}=await response.json();

    setObservaciones(observacion);

  }

  const resetearAlumno = () =>{
    setAlumnoInsertar({});
  }

  const cleanData= () =>{
    setDataInsertar("");
    setObservacion("");
    setAlumnoInsertar({});
  }
  const postData= async () => {

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
              console.log("aaa");
            }
          
      } catch (error) {
          alert("No se insertó");
      }
    }else{
      try{
        const put = await axios.put('https://api-colegio-g12.herokuapp.com/escuela/actualizar-observacion', {
                observacionId:idObservacion,
                descripcion:observacion 
        });
      
        console.log(put);
      }catch(error){
        alert("No se pudo actualizar al alumno");
      }
    }
    
}

/*   const actualizarObservacion = async () =>{
    const put = await axios.put('https://api-colegio-g12.herokuapp.com/escuela/actualizar-observacion', {
                idAlumno:buscarId(idEdit),
                nombre:nameEdit,
                apellido:lastNameEdit,
                nacimiento:new Date(birthdayOriginalEdit),
                telefono:phoneEdit,    

        })
  } */

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
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <MaterialTable
                columns={columns}
                data={dataAlumno}
                style={{float:'left'}}
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
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingBottom:"4rem",justifyContent:"center"}}>
              {alumnoInsertar?.nombre &&  <Typography style={{marginBottom:"-4rem"}} variant="h6">Editando a : {`${alumnoInsertar.nombre} ${alumnoInsertar.apellido}`}</Typography>}
              
              <TextField
                
                  id="outlined-multiline-static"
                  label="Observación"
                  value={observacion}
                  style={{float:'right',marginRight:'50px',marginTop:'80px',width:'350px'}}
                  multiline
                  rows={8}
                  variant="outlined"
                  onChange={handleObservacion}
              />
              <div style={{display:"flex",justifyContent:""}}>
                <CButton style={{marginTop:"2rem"}}color="success" onClick={postData}>Guardar</CButton>
                <CButton style={{marginTop:"2rem",marginLeft:"1rem"}}color="primary" onClick={cleanData}>Cancelar</CButton>
              </div>
              
            </div>
            
          </div>
          
            
        </div>
    )
}

export default Observaciones
