import { useState } from 'react'
import './App.css'
import { TableEmpleados } from './components/tableEmpleados/TableEmpleados'
import { TableSolicitudes } from './components/tableSolicitudes/TableSolicitudes'

function App() {


  return (
    <div className='o-body-page'>
      <div className='o-empelados-part'>
        <TableEmpleados></TableEmpleados>
      </div>
      <div className='o-solicitudes-part'>
        <TableSolicitudes></TableSolicitudes>
      </div>
    </div>
  )
}

export default App
