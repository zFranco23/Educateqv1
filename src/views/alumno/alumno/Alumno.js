import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {Modal, TextField,Button, Input, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {
    CButton,
  } from '@coreui/react';

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
    }
  }));

function Alumno() {
    const styles = useStyles();

    const [dataAlumno,setdataAlumno]=useState([]);
    const [modalInsertar,setModalInsertar]=useState(false);
    const [modalEditar,setModalEditar]=useState(false);

    /**FOR INSERT */
    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("");
    const [birthday,setBirthday]=useState("");
    const [phone,setPhone]=useState("");

    /**FOR EDIT */
    const [idEdit,setIdEdit]=useState();
    const [nameEdit,setNameEdit]=useState("");
    const [lastNameEdit,setLastNameEdit]=useState("");
    const [birthdayEdit,setBirthdayEdit]=useState("");
    const [birthdayOriginalEdit,setBirthdayOriginalEdit]=useState("");
    const [phoneEdit,setPhoneEdit]=useState("");


    const insertarAlumno=()=>{
        setdataAlumno([...dataAlumno,{
            orden:dataAlumno.length+1,
            apellido:lastName,
            nombre:name,
            edad:getAge(getBirthday(birthday)),
            cumpleanos:getBirthday(birthday),
            telefono:phone
        }])
        setModalInsertar(false);
    }
    const eliminarAlumno = (value) =>{
        if(window.confirm(`Desea eliminar a : ${value.nombre} ${value.apellido}`)){
            const newData=dataAlumno.filter(alumno => alumno.orden!=value.orden);
            setdataAlumno(newData);
        }
    }

    /* FOR EDIT */
    const actualizarAlumno = (idEdit) =>{
        console.log(idEdit);
        const newData=dataAlumno.map((alumno,index)=>{
            if(alumno.orden==idEdit){
                return (
                    {
                        orden:alumno.orden,
                        apellido:lastNameEdit,
                        nombre:nameEdit,
                        edad:getAge(getBirthday(birthdayOriginalEdit)),
                        cumpleanos:getBirthday(birthdayOriginalEdit),
                        telefono:phoneEdit
                    }
                )
            }
            return alumno;
        })
        setdataAlumno(newData);
        cerrarModalEditar();
    }

    const setEditInfo = (data)=>{
        abrirModalEditar();
        setIdEdit(data.orden);
        setNameEdit(data.nombre);
        setLastNameEdit(data.apellido);
        setBirthdayEdit(data.cumpleanos);
        setBirthdayOriginalEdit(reverse(data.cumpleanos));
        setPhoneEdit(data.telefono)
    }
    /** */


    /** INSERTAR  **/
    const abrirModalInsertar=()=>{  
        setModalInsertar(true);
      }
    const cerrarModalInsertar=()=>{
        setModalInsertar(false);
        setName("");
        setLastName("");
        setBirthday("");
        setPhone("");
    }


    /** EDITAR**/
    const abrirModalEditar=()=>{  
        setModalEditar(true);
      }
    const cerrarModalEditar=()=>{
        setModalEditar(false);
        setIdEdit();
        setNameEdit("");
        setLastNameEdit("");
        setBirthdayEdit("");
        setBirthdayOriginalEdit("");
        setPhoneEdit("");
    }

    function reverse(str){
        let day=str.substring(0,2);
        let month=str.substring(3,5);
        let year=str.substring(6,10);

        return `${year}-${month}-${day}`;
    }
    function getBirthday(value){
        let year=value.substring(0,4);
        let month=value.substring(5,7);
        let day=value.substring(8,10);
        /*      01/34/6789   */
        return `${day}/${month}/${year}`;
    }
    function getAge(value){
        let day =parseInt(value.substring(0,2),10);
        let month =parseInt(value.substring(3,5),10);
        let year = parseInt(value.substring(6,10),10);

        let hoy = new Date();
        let cumpleanos = new Date(year,month,day);
        let  edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let  m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        } 
        return edad;
    }

    async function getData(){
        const response=await fetch("https://api-colegio-g12.herokuapp.com/escuela/buscar-alumnos-del-tutor/607349c1a3ee950015a7faa7");
        const {alumnos}=await response.json();
        const newData=alumnos.map((alumno,index)=>(
            {
                orden:index+1,
                apellido:alumno.apellido,
                nombre:alumno.nombre,
                edad:getAge(getBirthday(alumno.nacimiento)),
                cumpleanos:getBirthday(alumno.nacimiento),
                telefono:alumno.telefono
            }
        ))
        setdataAlumno(newData);
    }

    useEffect(()=>{
        getData();
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
        title:'Edad',
        field:'edad',
        type:"numeric"
    },
    {
        title:'Cumpleaños',
        field:'cumpleanos'
    },
    {
        title:'Teléfono',
        field:'telefono',
        type:"numeric"
    }
];

/* const data = [
    
    {orden:1, apellido:' Flores Solis',nombre: 'Hector Alexis', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:2, apellido:' Dominguez Nonalaya', nombre: 'Alexander Berney', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:3, apellido:' Correa Atucsa',nombre: 'Breiner Roiser', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:4, apellido:' Hermenegildo Flores', nombre: 'Franco Jossep' , edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:5, apellido:' Cueva Heras', nombre: 'Kevin Rodrigo', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:6, apellido:' Flores Pucho',nombre: 'Juan Carlos', edad:21, cumpleanos:'15/06/1999',telefono:980622918}
] */

const bodyInsertar=(
    <div className={styles.modal}>
        <h3>Agregar Nuevo Alumno</h3>
        <TextField className={styles.inputMaterial} label="Apellidos" onChange={(e)=>setLastName(e.target.value)}/><br/>
        <TextField className={styles.inputMaterial} label="Nombres"onChange={(e)=>setName(e.target.value)} /><br/><br/>
        <TextField className={styles.inputMaterial} type="date" onChange={(e)=>setBirthday(e.target.value)}/><br/>
        <TextField className={styles.inputMaterial} type="number" label="Teléfono" onChange={(e)=>setPhone(e.target.value)}/><br/>
        <br/><br/>
        <div align="right"> 
            <CButton color="info" onClick={insertarAlumno} style={{marginRight:'5px'}}>Insertar</CButton>
            <CButton color="danger" onClick={cerrarModalInsertar}>Cancelar</CButton>
        </div>
    </div>

)

const bodyEditar=(
    <div className={styles.modal}>
        <h3>Editar Alumno</h3>
        <TextField className={styles.inputMaterial} defaultValue={lastNameEdit} label="Apellidos" onChange={e=>setLastNameEdit(e.target.value)}/><br/>
        <TextField className={styles.inputMaterial} defaultValue={nameEdit} label="Nombres" onChange={e=>setNameEdit(e.target.value)}/><br/><br/>
        <TextField className={styles.inputMaterial} defaultValue={birthdayOriginalEdit} type="date" onClick={e=>setBirthdayOriginalEdit(e.target.value)}/><br/>
        <TextField className={styles.inputMaterial} defaultValue={phoneEdit} type="number" label="Teléfono" onChange={e=>setPhoneEdit(e.target.value)}/><br/>
        <br/><br/>
        <div align="right"> 
            <CButton color="info" style={{marginRight:'5px'}} onClick={()=>actualizarAlumno(idEdit)}>Actualizar</CButton>
            <CButton color="danger" onClick={cerrarModalEditar}>Cancelar</CButton>
        </div>
    </div>

)



    return (
        <div style={{ maxWidth: "100%" }}>
    
            <CButton color="success" style={{ float:'right', marginBottom:'20px'}} onClick={abrirModalInsertar}>Insertar Alumno</CButton>
            {/* Modal insertar */}
            <Modal
                open={modalInsertar}
                onClose={cerrarModalInsertar}
                >
                    {bodyInsertar}
            </Modal>
            {/* Modal Editar */}
            <Modal
                open={modalEditar}
                onClose={cerrarModalEditar}>
                    {bodyEditar}
            </Modal>
            
            <br/><br/>
            {dataAlumno.length>0 ? (<MaterialTable
                columns={columns}
                data={dataAlumno}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',                  
                        tooltip: 'Editar Alumno',
                        //onClick:(event,rowData)=>alert('Has elegido editar al alumno:'+rowData.nombre)
                        onClick:(e,rowData)=>setEditInfo(rowData)
                            
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Alumno',
                        onClick:(e,rowData)=>eliminarAlumno(rowData)
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
            />) : <CircularProgress size="50"/>}
            

        </div>
    )
}

export default Alumno
