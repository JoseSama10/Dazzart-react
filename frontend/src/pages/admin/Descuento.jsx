import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../../css/CSSA/descuento.css";
import Swal from "sweetalert2";
import SidebarAdmin from "../../components/SideBarAdmin";

export default function DescuentosAdmin() {
  const [descuentos, setDescuentos] = useState([]);

  const cargarDescuentos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/descuentos");
      setDescuentos(Array.isArray(res.data) ? res.data : []);

      setTimeout(() => {
        if (!$.fn.DataTable.isDataTable("#tablaDescuentos")) {
          $('#tablaDescuentos').DataTable({
            responsive: true,
            autoWidth: false,
            pageLength: 5,
            lengthMenu: [[5, 10, 20], [5, 10, 20]],
            language: {
              url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
            }
          });
        }
      }, 100);
    } catch (error) {
      console.error("Error al cargar descuentos:", error);
    }
  };

  const eliminarDescuento = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.post(`http://localhost:3001/api/descuentos/eliminar/${id}`);
      Swal.fire("Eliminado", "El descuento ha sido eliminado.", "success");
      if ($.fn.DataTable.isDataTable("#tablaDescuentos")) {
        $("#tablaDescuentos").DataTable().destroy();
      }
      cargarDescuentos();
    } catch (error) {
      console.error("Error al eliminar descuento:", error);
      Swal.fire("Error", "No se pudo eliminar el descuento.", "error");
    }
  };

  useEffect(() => {
    cargarDescuentos();
  }, []);

  return (
    <>
      <SidebarAdmin />

      <main className="main-content px-4" style={{ marginLeft: "280px" }}>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1 className="mb-0">Gestión de Descuentos</h1>
          <a href="/formulario-descuento" className="btn btn-dark">
            Añadir Descuento
          </a>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped" id="tablaDescuentos">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Estado</th>
                <th>Aplicación</th>
                <th>Producto/Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {descuentos.map((d) => (
                <tr key={d.id_descuento}>
                  <td>{d.id_descuento}</td>
                  <td>{d.tipo_descuento}</td>
                  <td>{d.valor}</td>
                  <td>{d.fecha_inicio}</td>
                  <td>{d.fecha_fin}</td>
                  <td>{d.estado_descuento}</td>
                  <td>{d.aplicacion}</td>
                  <td>
                    {d.aplicacion === "producto"
                      ? d.nombre_producto
                      : d.aplicacion === "categoria"
                      ? d.nombre_categoria
                      : "Todos"}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <a
                        href={`/editar-descuento/${d.id_descuento}`}
                        className="btn btn-success btn-sm"
                      >
                        Editar
                      </a>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarDescuento(d.id_descuento)}
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
      </main>
    </>
  );
}