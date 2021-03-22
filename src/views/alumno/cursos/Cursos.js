import React from 'react';
import MaterialTable from 'material-table';

function Cursos() {

    const columns=[
        {
            title:'Nro. de Curso',
            field:'orden',
            type:"numeric"
        },
        {
            title:'Curso',
            field:'curso'
        }
    ];

    const data = [
    
        {orden:1, curso:'Matematica Básica I'},
        {orden:2, curso:'Religión'},
        {orden:3, curso:'Física'},
        {orden:4, curso:'Razonamiento Verbal'},
        {orden:5, curso:'Algebra'}
    ]

    return (
        <div style={{ maxWidth: "50%" }}>
            <MaterialTable
                columns={columns}
                data={data}
                title="Sección A"
                actions={[
                    {
                        icon:'edit',
                        tooltip: 'Editar Curso',
                        onClick:(event,rowData)=>alert('Has elegido editar al curso:'+rowData.curso)
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
        </div>
    )
}

export default Cursos
