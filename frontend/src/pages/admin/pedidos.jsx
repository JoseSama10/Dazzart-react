import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import AdminLayout from '../../components/AdminLayout';
import { useNavigate } from 'react-router-dom'; 

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    fetch('http://localhost:3001/pedidos')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al obtener pedidos:', error));
  }, []);

  useEffect(() => {
    if (pedidos.length > 0) {
      const tabla = $('#tablaPedidos');

      if ($.fn.DataTable.isDataTable('#tablaPedidos')) {
        tabla.DataTable().destroy();
      }

      tabla.DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        language: {
          lengthMenu: 'Mostrar _MENU_ registros por página',
          zeroRecords: 'No se encontraron resultados',
          info: 'Mostrando página _PAGE_ de _PAGES_',
          infoEmpty: 'No hay registros disponibles',
          infoFiltered: '(filtrado de _MAX_ registros en total)',
          search: 'Buscar:',
          paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior'
          }
        }
      });
    }
  }, [pedidos]);

  return (
    <AdminLayout>
      <div className="main-content p-4">
        <h1>Gestión de pedidos</h1>
        <table className="table table-striped table-hover" id="tablaPedidos">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Dirección</th>
              <th>Nombre</th>
              <th>Productos</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id_factura}>
                <td>{pedido.id_factura}</td>
                <td>{pedido.direccion}</td>
                <td>{pedido.nombre_cliente}</td>
                <td>{pedido.productos}</td>
                <td>{pedido.total_productos}</td>
                <td>${Number(pedido.total).toLocaleString('es-CO')}</td>
                <td>{pedido.estado}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => navigate(`/ver-factura/${pedido.id_factura}`)}
                  >
                    Observar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
