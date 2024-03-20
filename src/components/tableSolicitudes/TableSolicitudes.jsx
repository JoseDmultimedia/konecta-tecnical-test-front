import React, { useState, useEffect } from "react";
import {
  getAllSolicitud,
  deleteSolicitud,
  insertSolicitud,
} from "../../api/solicitud"; 

function TableSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [newSolicitud, setNewSolicitud] = useState({
    codigo: "",
    descripcion: "",
    resumen: "",
    id_empleado: "",
  });

  useEffect(() => {
    getAllSolicitud("http://localhost:3000/konecta-test/v1/solicitud")
      .then((data) => {
        setSolicitudes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSolicitud(
        `http://localhost:3000/konecta-test/v1/solicitud/${id}`
      );
      setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSolicitud({
      ...newSolicitud,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await insertSolicitud(
        "http://localhost:3000/konecta-test/v1/solicitud",
        newSolicitud
      );
      getAllSolicitud("http://localhost:3000/konecta-test/v1/solicitud")
        .then((data) => {
          setSolicitudes(data);
        })
        .catch((error) => {
          console.error(error);
        });
      setNewSolicitud({
        codigo: "",
        descripcion: "",
        resumen: "",
        id_empleado: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="o-body-empleados-component">
      <h2>Tabla de Solicitudes</h2>
      <form onSubmit={handleSubmit} className="o-form-empleados">
        <label>Código:</label>
        <input
          type="text"
          name="codigo"
          value={newSolicitud.codigo}
          onChange={handleInputChange}
        />
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={newSolicitud.descripcion}
          onChange={handleInputChange}
        />
        <label>Resumen:</label>
        <input
          type="text"
          name="resumen"
          value={newSolicitud.resumen}
          onChange={handleInputChange}
        />
        <label>Empleado:</label>
        <input
          type="text"
          name="id_empleado"
          value={newSolicitud.id_empleado}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Solicitud</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Codigo</th>
            <th>Descripción</th>
            <th>Resumen</th>
            <th>Empleado</th>
            <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.id}</td>
              <td>{solicitud.codigo}</td>
              <td>{solicitud.descripcion}</td>
              <td>{solicitud.resumen}</td>
              <td>{solicitud.nombre_empleado}</td>
              <td>
                <button onClick={() => handleDelete(solicitud.id)}>
                  Eliminar
                </button>
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { TableSolicitudes };
