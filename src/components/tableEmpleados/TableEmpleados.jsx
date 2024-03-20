import React, { useState, useEffect } from "react";
import { getEmpleado, insertEmpleado } from "../../api/empleado";
import "./TableEmpleados.css";

function TableEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoToSearch, setEmpleadoToSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [newEmpleado, setNewEmpleado] = useState({
    fecha_ingreso: "",
    nombre: "",
    salario: "",
  });

  useEffect(() => {
    if (empleadoToSearch) {
      setLoading(true);
      getEmpleado(
        `http://localhost:3000/konecta-test/v1/empleado/getByName/${empleadoToSearch}`
      )
        .then((data) => {
          setEmpleados(data ? [data] : []);
          setLoading(false);
        })
        .catch((error) => {
          setEmpleados([]);
          setLoading(false);
        });
    } else {
      setLoading(true);
      getEmpleado("http://localhost:3000/konecta-test/v1/empleado")
        .then((data) => {
          setEmpleados(data);
          setLoading(false);
        })
        .catch((error) => {
          setEmpleados([]);
          setLoading(false);
        });
    }
  }, [empleadoToSearch]);

  const handleChange = (event) => {
    setEmpleadoToSearch(event.target.value);
  };

  const handleNewEmpleadoChange = (event) => {
    const { name, value } = event.target;
    setNewEmpleado({
      ...newEmpleado,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    insertEmpleado(
      "http://localhost:3000/konecta-test/v1/empleado",
      newEmpleado
    )
      .then(() => {
        getEmpleado("http://localhost:3000/konecta-test/v1/empleado")
          .then((data) => {
            setEmpleados(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setEmpleados([]);
            setLoading(false);
          });
        setNewEmpleado({
          fecha_ingreso: "",
          nombre: "",
          salario: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="o-body-empleados-component">
      <h2>Tabla de Empleados</h2>
      <div className="o-search-bar">
        <p>Busca tu empleado: </p>
        <input
          value={empleadoToSearch}
          type="text"
          placeholder="Nombre del Empleado"
          className="o-input"
          onChange={handleChange}
        ></input>
      </div>

      <form onSubmit={handleSubmit} className="o-form-empleados">
        <h3>Agregar Nuevo Empleado</h3>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={newEmpleado.nombre}
          onChange={handleNewEmpleadoChange}
        />
        <label>Fecha de Ingreso:</label>
        <input
          type="text"
          name="fecha_ingreso"
          value={newEmpleado.fecha_ingreso}
          onChange={handleNewEmpleadoChange}
        />

        <label>Salario:</label>
        <input
          type="text"
          name="salario"
          value={newEmpleado.salario}
          onChange={handleNewEmpleadoChange}
        />
        <button type="submit">Agregar Empleado</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : empleados && empleados.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Ingreso</th>
              <th>Nombre</th>
              <th>Salario</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.fecha_ingreso}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.salario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
}

export { TableEmpleados };
