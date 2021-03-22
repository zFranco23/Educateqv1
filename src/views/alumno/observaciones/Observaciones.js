import React from 'react';
import MaterialTable from 'material-table';

function Observaciones() {

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

export default Observaciones
