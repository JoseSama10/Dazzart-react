import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

export default function VerFactura() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/pedidos/${id}`)
      .then((res) => res.json())
      .then((data) => setFactura(data))
      .catch((err) => console.error("Error al obtener factura:", err));
  }, [id]);

  if (!factura) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Cargando factura...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card p-4 shadow" style={{ width: "500px" }}>
          <h2 className="text-center mb-4">Detalle de Factura</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>ID:</strong> {factura.id_factura}</li>
            <li className="list-group-item"><strong>Nombre:</strong> {factura.nombre_cliente}</li>
            <li className="list-group-item"><strong>Dirección:</strong> {factura.direccion}</li>
            <li className="list-group-item"><strong>Productos:</strong> {factura.productos}</li>
            <li className="list-group-item"><strong>Cantidad:</strong> {factura.total_productos}</li>
            <li className="list-group-item"><strong>Total:</strong> ${Number(factura.total).toLocaleString('es-CO')}</li>
            <li className="list-group-item"><strong>Estado:</strong> {factura.estado}</li>
          </ul>

          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
