import React,{useState, useEffect} from 'react';
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

function Cursos() {

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
            title:'Nro. de Curso',
            field:'orden',
            type:"numeric"
        },
        {
            title:'Curso',
            field:'curso'
        },
        {
            title:'Área',
            field:'area'
        },
        {
            title:'Horas',
            field:'horas'
        }
    ];

    const data = [
    
        {orden:1, curso:'Matematica Básica I', area:'Ciencias', horas:'2'},
        {orden:2, curso:'Religión', area:'Letras', horas:'2'},
        {orden:3, curso:'Física', area:'Ciencias', horas:'2'},
        {orden:4, curso:'Razonamiento Verbal', area:'Letras', horas:'2'},
        {orden:5, curso:'Algebra', area:'Ciencias', horas:'2'}
    ]

    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo Curso</h3>
            <TextField className={styles.inputMaterial} label="Nombre del Curso"/><br/>
            <TextField className={styles.inputMaterial} label="Área"/><br/>
            <TextField className={styles.inputMaterial} type="number" label="Horas"/><br/>
            <br/><br/>
            <div align="right"> 
                <CButton color="info" style={{marginRight:'5px'}}>Insertar</CButton>
                <CButton color="danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</CButton>
            </div>
        </div>
    )

    const bodyEditar=(
        <div className={styles.modal}>
            <h3>Editar Curso</h3>
            <TextField className={styles.inputMaterial} label="Nombre del Curso"/><br/>
            <TextField className={styles.inputMaterial} label="Área"/><br/>
            <TextField className={styles.inputMaterial} type="number" label="Horas"/><br/>
            <br/><br/>
            <div align="right"> 
                <CButton color="info" style={{marginRight:'5px'}}>Aceptar</CButton>
                <CButton color="danger"  onClick={()=>abrirCerrarModalEditar()}>Cancelar</CButton>
            </div>
        </div>
    )

    return (
        <div style={{ maxWidth: "100%" }}>
            <CButton color="success" style={{ float:'right', marginBottom:'20px'}} onClick={()=>abrirCerrarModalInsertar()}>Agregar Curso</CButton>
            <br/><br/>
            <MaterialTable
                columns={columns}
                data={data}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Curso',
                        //onClick:(event,rowData)=>alert('Has elegido editar al curso:'+rowData.curso)
                        onClick:()=>abrirCerrarModalEditar()
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Curso',
                        onClick:(event,rowData)=>window.confirm('¿Estás seguro de eliminar al curso: '+rowData.curso+'?')
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
            <br/><br/>
            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                    {bodyEditar}
            </Modal>
        </div>
    )
}

export default Cursos
