import React from 'react';
import MaterialTable from 'material-table';

function Asistencia() {

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

    return (
        <div style={{ maxWidth: "60%" }}>
            <MaterialTable
                columns={columns}
                data={data}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Alumno',
                        onClick:(event,rowData)=>alert('Has elegido editar la asistencia del alumno:'+rowData.nombre)
                    },
                    {
                        icon:'delete',
                        tooltip: 'Eliminar Alumno',
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
        </div>
    )
}

export default Asistencia
