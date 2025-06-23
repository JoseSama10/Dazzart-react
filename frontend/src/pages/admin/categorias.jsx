import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../../css/CSSA/gestionproductos.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from "sweetalert2";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  // Para edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ id_categoria: null, nombre: "", descripcion: "" });

  // Función para cargar categorías
  const cargarCategorias = () => {
    axios
      .get("http://localhost:3001/categorias/listar")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategorias(res.data);
        } else {
          setCategorias([]);
          console.error("La respuesta no es un arreglo:", res.data);
        }

        setTimeout(() => {
          if (!$.fn.DataTable.isDataTable("#tablaCategorias")) {
            $("#tablaCategorias").DataTable({
              responsive: true,
              autoWidth: false,
              pageLength: 10,
              lengthMenu: [
                [5, 10, 15],
                [5, 10, 15],
              ],
              language: {
                lengthMenu: "Mostrar _MENU_ registros por página",
                zeroRecords: "No se encontraron resultados",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(filtrado de _MAX_ registros en total)",
                search: "Buscar:",
                paginate: {
                  first: "Primero",
                  last: "Último",
                  next: "Siguiente",
                  previous: "Anterior",
                },
              },
            });
          }
        }, 100);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Manejo del formulario nuevo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion) return;

    try {
      await axios.post("http://localhost:3001/categorias/agregar", form);
      Swal.fire("Agregado", "Categoría agregada con éxito", "success");
      setForm({ nombre: "", descripcion: "" });
      if ($.fn.DataTable.isDataTable("#tablaCategorias")) {
        $("#tablaCategorias").DataTable().destroy();
      }
      cargarCategorias();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo agregar la categoría", "error");
    }
  };

  // Eliminar categoría
  const eliminarCategoria = async (id) => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "Eliminar categoría",
      text: "¿Estás seguro de eliminar esta categoría?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3001/categorias/eliminar/${id}`);
      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Categoría eliminada",
          text: "La categoría ha sido eliminada con éxito.",
        });
        if ($.fn.DataTable.isDataTable("#tablaCategorias")) {
          $("#tablaCategorias").DataTable().destroy();
        }
        cargarCategorias();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la categoría.",
      });
    }
  };

  // Abrir modal con datos para editar
  const abrirEditarModal = (categoria) => {
    setEditForm({
      id_categoria: categoria.id_categoria,
      nombre: categoria.nombre_categoria,
      descripcion: categoria.descripcion_categoria,
    });
    setShowEditModal(true);
  };

  // Manejar cambios en el form de edición
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Guardar edición
  const guardarEdicion = async (e) => {
    e.preventDefault();
    const { id_categoria, nombre, descripcion } = editForm;
    if (!nombre || !descripcion) {
      Swal.fire("Error", "Nombre y descripción son obligatorios", "error");
      return;
    }
    try {
      await axios.put(`http://localhost:3001/categorias/editar/${id_categoria}`, {
        nombre_categoria: nombre,
        descripcion_categoria: descripcion,
      });
      Swal.fire("Guardado", "Categoría actualizada con éxito", "success");
      setShowEditModal(false);
      if ($.fn.DataTable.isDataTable("#tablaCategorias")) {
        $("#tablaCategorias").DataTable().destroy();
      }
      cargarCategorias();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar la categoría", "error");
    }
  };

  return (
    <>
      {/* Sidebar (versión escritorio) */}
      <div className="sidebar d-none d-md-block">
        <h5>Dazzart Components</h5>
        <ul className="nav flex-column">
          <li>
            <a href="/admin-categorias">Categorías</a>
          </li>
          <li>
            <a href="/admin-subcategorias">Subcategorías</a>
          </li>
          <li>
            <a href="#">Productos</a>
          </li>
          <li>
            <a href="#">Descuentos</a>
          </li>
          <li>
            <a href="#">Pedidos</a>
          </li>
          <li>
            <a href="#" data-bs-toggle="collapse" data-bs-target="#configMenu">
              Configuración
            </a>
            <ul className="collapse" id="configMenu">
              <li>
                <a className="nav-link text-white" href="#">
                  Clientes
                </a>
              </li>
              <li>
                <a className="nav-link text-white" href="#">
                  Salir
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Sidebar móvil */}
      <button
        className="btn btn-dark d-md-none m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
      >
        ☰ Menú
      </button>

      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex="-1"
        id="sidebarMenu"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Dazzart Components</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li>
              <a href="/admin-categorias">Categorías</a>
            </li>
            <li>
              <a href="/admin-subcategorias">Subcategorías</a>
            </li>
            <li>
              <a href="#">Productos</a>
            </li>
            <li>
              <a className="nav-link text-white" href="#">
                Pedidos
              </a>
            </li>
            <li>
              <a href="#">Descuentos</a>
            </li>
            <li>
              <a
                className="nav-link text-white"
                data-bs-toggle="collapse"
                href="#configMenuMobile"
              >
                Configuración
              </a>
              <ul className="collapse" id="configMenuMobile">
                <li>
                  <a className="nav-link text-white" href="#">
                    Clientes
                  </a>
                </li>
                <li>
                  <a className="nav-link text-white" href="#">
                    Salir
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="main-content p-4">
        <h2>Agregar nueva categoría</h2>
        <form className="row g-3 mb-4" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="descripcion"
              className="form-control"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              className="btn btn-warning text-white w-100"
            >
              Añadir
            </button>
          </div>
        </form>

        <table className="table table-striped table-hover" id="tablaCategorias">
          <thead className="table-dark">
            <tr>
              <th>ID Categoría</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id_categoria}>
                <td>{categoria.id_categoria}</td>
                <td>{categoria.nombre_categoria}</td>
                <td>{categoria.descripcion_categoria}</td>
                <td>
                  <div className="d-flex">
                    <button
                      className="btn btn-success me-2"
                      onClick={() => abrirEditarModal(categoria)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarCategoria(categoria.id_categoria)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para editar */}
      <div
        className={`modal fade ${showEditModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: showEditModal ? "rgba(0,0,0,0.5)" : "transparent" }}
        onClick={() => setShowEditModal(false)}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <form onSubmit={guardarEdicion}>
              <div className="modal-header">
                <h5 className="modal-title">Editar Categoría</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={editForm.nombre}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    className="form-control"
                    value={editForm.descripcion}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
