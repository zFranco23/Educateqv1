import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CButton } from '@coreui/react';

const Cursos = [
    {
      value: 'Matemática 1',
      label: 'Matemática 1',
    },
    {
      value: 'Religión',
      label: 'Religión',
    },
    {
      value: 'Física',
      label: 'Física',
    },
    {
      value: 'Química',
      label: 'Química',
    },
    {
      value: 'Comunicación Social',
      label: 'Comunicación Social',
    },
    {
      value: 'Razonamiento Verbal',
      label: 'Razonamiento Verbal',
    },
    {
      value: 'Algebra',
      label: 'Algebra',
    }  
  ];

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Observaciones() {

  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [curso, setCurso] = React.useState('Matemática 1');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCurso = (event) => {
    setCurso(event.target.value);
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

    const data = [
    
        {orden:1, apellido:' Flores Solis',nombre: 'Hector Alexis'},
        {orden:2, apellido:' Dominguez Nonalaya', nombre: 'Alexander Berney'},
        {orden:3, apellido:' Correa Atucsa',nombre: 'Breiner Roiser'},
        {orden:4, apellido:' Hermenegildo Flores', nombre: 'Franco Jossep'},
        {orden:5, apellido:' Cueva Heras', nombre: 'Kevin Rodrigo'},
        {orden:6, apellido:' Flores Pucho',nombre: 'Juan Carlos'}
    ]

    return (
        <div style={{ maxWidth: "100%" }}>
            <TextField
                id="outlined-select-currency-native"
                select
                label="Bimestre"
                value={curso}
                onChange={handleCurso}
                SelectProps={{
                    native: true,
                }}
                helperText="Seleccione un Curso"
                variant="outlined"
            >
                {Cursos.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
                ))}
            </TextField><br/><br/>
            <MaterialTable
                columns={columns}
                data={data}
                style={{float:'left'}}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Observación',
                        onClick:(event,rowData)=>alert('Has elegido editar al alumno:'+rowData.nombre)
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Observación',
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
            <TextField
                id="outlined-multiline-static"
                label="Observación"
                style={{float:'right',marginRight:'50px',marginTop:'80px',width:'350px'}}
                multiline
                rows={8}
                defaultValue="Default Value"
                variant="outlined"
            />
            <TextField
                id="outlined-multiline-static"
                label="Record"
                style={{float:'right',marginRight:'150px',marginTop:'100px'}}
                multiline
                rows={2}
                defaultValue="Default Value"
                variant="outlined"
            />
            <CButton color="success" style={{marginTop:'20px', marginLeft:'780px'}}>Guardar</CButton>
        </div>
    )
}

export default Observaciones
