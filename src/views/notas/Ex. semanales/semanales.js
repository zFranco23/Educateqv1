import React, { useState } from 'react';
import MaterialTable from 'material-table';
import {CChart} from '@coreui/react-chartjs'
import Typography from '@material-ui/core/Typography'
import { Grid, makeStyles,TextField} from '@material-ui/core';


const styles=makeStyles({
    container:{
        marginTop: "1rem",
        marginBottom:"1rem"
    }
    
})

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


function Semanales() {
    const classes=styles();
    const [curso, setCurso] = useState("Matemática 1");
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
        },
        {
            title:'Nota',
            field:'nota',
            type:"numeric"
        }
    ];

    const data = [
    
        {orden:1, apellido:' Flores Solis',nombre: 'Hector Alexis', nota: 19},
        {orden:2, apellido:' Dominguez Nonalaya', nombre: 'Alexander Berney', nota: 19},
        {orden:3, apellido:' Correa Atucsa',nombre: 'Breiner Roiser', nota: 19},
        {orden:4, apellido:' Hermenegildo Flores', nombre: 'Franco Jossep' , nota: 19},
        {orden:5, apellido:' Cueva Heras', nombre: 'Kevin Rodrigo', nota: 19},
        {orden:6, apellido:' Flores Pucho',nombre: 'Juan Carlos', nota: 19}
    ]

    /**GRAFICO */

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
          'Aprobados',
          'Desaprobados',
          'Neutral',
        ],
        datasets: [
          {
            data: [20, 50, 100],
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

    return (
        <div style={{ maxWidth: "100%" }}>
            <TextField
                id="outlined-select-currency-native"
                select
                label="Curso"
                value={curso}
                onChange={handleCurso}
                SelectProps={{
                    native: true,
                }}
                helperText="Seleccione un Curso"
                variant="outlined"
                style={{marginBottom:"1rem"}}
            >
                {Cursos.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
                ))}
            </TextField>
            
            <MaterialTable
                maxWidth="50%"
                columns={columns}
                data={data}
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
            
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={12} md={6} className={classes.graphic} >
                    <Typography variant="h6" > Gráfico de Barras</Typography>
                    <CChart  type="bar" datasets={bar.datasets} labels="months" options={options}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}className={classes.graphic} >
                    <Typography variant="h6" >Paleta</Typography>
                    <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
                </Grid>
            </Grid>

        
        </div>
    )
}

export default Semanales