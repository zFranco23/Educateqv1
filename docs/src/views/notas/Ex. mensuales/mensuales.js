import React from 'react';
import MaterialTable from 'material-table';

function Mensuales() {

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

    return (
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable
                columns={columns}
                data={data}
                title="Sección A - Exámenes Mensuales"
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
        </div>
    )
}

export default Mensuales