import React,{useState,useEffect}  from 'react';
import MaterialTable from 'material-table';
import {Modal, TextField,Button,MenuItem} from '@material-ui/core';
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

  const tipoAsistencia = [
    {
      value: 'Asistió',
      label: 'A',
    },
    {
      value: 'Justificado',
      label: 'J',
    },
    {
      value: 'Faltó',
      label: 'F',
    }
  ];

  const Semanas = [
    {
      value: 'Semana 1',
      label: 'Semana 1',
    },
    {
      value: 'Semana 2',
      label: 'Semana 2',
    },
    {
      value: 'Semana 3',
      label: 'Semana 3',
    },
    {
      value: 'Semana 4',
      label: 'Semana 4',
    },
    {
      value: 'Semana 5',
      label: 'Semana 5',
    },
    {
      value: 'Semana 6',
      label: 'Semana 6',
    },
    {
      value: 'Semana 7',
      label: 'Semana 7',
    },
    {
      value: 'Semana 8',
      label: 'Semana 8',
    }    
  ];

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

function Asistencia() {

    const styles = useStyles();
    const [modalInsertar,setModalInsertar]=useState(false);
    const [semana, setSemana] = React.useState('Semana 1');
    const [asistencia, setAsistencia] = React.useState('Asistió');

    const abrirCerrarModalInsertar=()=>{  
        setModalInsertar(!modalInsertar);
      }

    const handleChange = (event) => {
        setAsistencia(event.target.value);
    } 
    
    const handleSemana = (event) => {
        setSemana(event.target.value);
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
            title:'Asistencia',
            field:'asistencia'
        }
    ];

    const data = [
    
        {orden:1, apellido:' Flores Solis',nombre: 'Hector Alexis', asistencia:'A'},
        {orden:2, apellido:' Dominguez Nonalaya', nombre: 'Alexander Berney', asistencia:'A'},
        {orden:3, apellido:' Correa Atucsa',nombre: 'Breiner Roiser', asistencia:'A'},
        {orden:4, apellido:' Hermenegildo Flores', nombre: 'Franco Jossep' , asistencia:'J'},
        {orden:5, apellido:' Cueva Heras', nombre: 'Kevin Rodrigo', asistencia:'A'},
        {orden:6, apellido:' Flores Pucho',nombre: 'Juan Carlos', asistencia:'F'}
    ]

    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Editar Asistencia</h3>
            <TextField className={styles.inputMaterial} label="Apellidos"/><br/>
            <TextField className={styles.inputMaterial} label="Nombres"/><br/><br/>
            <TextField 
                className={styles.inputMaterial} 
                id="standard-select-currency"
                select
                label="Asistencia"
                value={asistencia}
                onChange={handleChange}
                helperText="Seleccione el tipo de Asistencia"
            >
                {tipoAsistencia.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
          ))}
            </TextField>
            <br/><br/>
            <div align="right"> 
                <CButton color="info" style={{marginRight:'5px'}}>Aceptar</CButton>
                <CButton color="danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</CButton>
            </div>
        </div>
    
    )


    
    return (
        <div style={{ maxWidth: "100%" }}>
            <TextField
                id="outlined-select-currency-native"
                select
                label="Bimestre"
                value={semana}
                onChange={handleSemana}
                SelectProps={{
                    native: true,
                }}
                helperText="Seleccione una Semana"
                variant="outlined"
            >
                {Semanas.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
                ))}
            </TextField><br/><br/>
            <MaterialTable
                columns={columns}
                data={data}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Asistencia',
                        //onClick:(event,rowData)=>alert('Has elegido editar la asistencia del alumno:'+rowData.nombre)
                        onClick:()=>abrirCerrarModalInsertar()
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Asistencia',
                        onClick:(event,rowData)=>window.confirm('¿Estás seguro de eliminar la asistencia del alumno: '+rowData.nombre+'?')
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
        </div>
        
    )
}

export default Asistencia
