import React from 'react';
import MaterialTable from 'material-table';

function Alumno() {

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

export default Alumno
