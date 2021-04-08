import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {Modal, TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
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
    const [modalInsertar,setModalInsertar]=useState(false);

    const abrirCerrarModalInsertar=()=>{  
        setModalInsertar(!modalInsertar);
      }
    
    const [modalEditar,setModalEditar]=useState(false);

    const abrirCerrarModalEditar=()=>{  
        setModalEditar(!modalEditar);
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

const data = [
    
    {orden:1, apellido:' Flores Solis',nombre: 'Hector Alexis', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:2, apellido:' Dominguez Nonalaya', nombre: 'Alexander Berney', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:3, apellido:' Correa Atucsa',nombre: 'Breiner Roiser', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:4, apellido:' Hermenegildo Flores', nombre: 'Franco Jossep' , edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:5, apellido:' Cueva Heras', nombre: 'Kevin Rodrigo', edad:21, cumpleanos:'15/06/1999',telefono:980622918},
    {orden:6, apellido:' Flores Pucho',nombre: 'Juan Carlos', edad:21, cumpleanos:'15/06/1999',telefono:980622918}
]

const bodyInsertar=(
    <div className={styles.modal}>
        <h3>Agregar Nuevo Alumno</h3>
        <TextField className={styles.inputMaterial} label="Apellidos"/><br/>
        <TextField className={styles.inputMaterial} label="Nombres"/><br/><br/>
        <TextField className={styles.inputMaterial} type="date"/><br/>
        <TextField className={styles.inputMaterial} type="number" label="Teléfono"/><br/>
        <br/><br/>
        <div align="right"> 
            <CButton color="info" style={{marginRight:'5px'}}>Insertar</CButton>
            <CButton color="danger" onclick={()=>abrirCerrarModalInsertar()}>Cancelar</CButton>
        </div>
    </div>

)

const bodyEditar=(
    <div className={styles.modal}>
        <h3>Editar Alumno</h3>
        <TextField className={styles.inputMaterial} label="Apellidos"/><br/>
        <TextField className={styles.inputMaterial} label="Nombres"/><br/><br/>
        <TextField className={styles.inputMaterial} type="date"/><br/>
        <TextField className={styles.inputMaterial} type="number" label="Teléfono"/><br/>
        <br/><br/>
        <div align="right"> 
            <CButton color="info" style={{marginRight:'5px'}}>Insertar</CButton>
            <CButton color="danger" onclick={()=>abrirCerrarModalEditar()}>Cancelar</CButton>
        </div>
    </div>

)



    return (
        <div style={{ maxWidth: "100%" }}>
    
            <CButton color="success" style={{ float:'right', marginBottom:'20px'}} onClick={()=>abrirCerrarModalInsertar()}>Insertar Alumno</CButton>
            <br/><br/>
            <MaterialTable
                columns={columns}
                data={data}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',                
                        tooltip: 'Editar Alumno',
                        //onClick:(event,rowData)=>alert('Has elegido editar al alumno:'+rowData.nombre)
                        onClick:()=>abrirCerrarModalEditar()
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

            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                    {bodyInsertar}
            </Modal>
            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                    {bodyEditar}
            </Modal>
        </div>
    )
}

export default Alumno
