import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../../css/CSSA/gestionproductos.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';

// Importa tu sidebar personalizado
import SidebarAdmin from "../../components/SidebarAdmin";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);

  // Función para cargar productos
  const cargarProductos = () => {
    axios
      .get("http://localhost:3001/productos/listar")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProductos(res.data);
        } else {
          setProductos([]);
          console.error("La respuesta no es un arreglo:", res.data);
        }

        setTimeout(() => {
          if (!$.fn.DataTable.isDataTable("#tablaProductos")) {
            $("#tablaProductos").DataTable({
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
    cargarProductos();
  }, []);

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Eliminar producto',
      text: '¿Estás seguro de eliminar este producto?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3001/productos/eliminar/${id}`);
      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: 'El producto ha sido eliminado con éxito.',
        });
        if ($.fn.DataTable.isDataTable("#tablaProductos")) {
          $("#tablaProductos").DataTable().destroy();
        }
        cargarProductos();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el producto.',
      });
    }
  };

  return (
    <>
      {/* Sidebar fijo */}
      <SidebarAdmin />

      {/* Contenido principal con margen para el sidebar */}
      <main
        className="main-content p-4"
        style={{ marginLeft: "280px" }} // mismo ancho que el sidebar para que no se sobreponga
      >


        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Gestión de Productos</h1>
          <a href="/agregar-producto" className="btn btn-warning text-white">Añadir Producto</a>
        </div>

        <table className="table table-striped table-hover" id="tablaProductos">
          <thead className="table-dark">
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre}</td>
                <td>
                  <img
                    src={producto.imagen ? `http://localhost:3001/img/${producto.imagen}` : "/default.png"}
                    alt={producto.nombre}
                    width="100"
                    height="100"
                  />
                </td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.id_categoria}</td>
                <td>{producto.fecha_creacion}</td>
                <td>
                  <div className="d-flex">
                    <a href={`/editar-producto/${producto.id_producto}`} className="btn btn-success me-2">Editar</a>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarProducto(producto.id_producto)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
