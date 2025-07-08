import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from '../../components/SideBarAdmin.jsx';

export default function EstadisticasAdmin() {
  const [estadisticas, setEstadisticas] = useState({
    totalVentas: 0,
    totalPedidos: 0,
    totalClientes: 0,
    totalProductos: 0,
    productosMasVendidos: []
  });

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const [productosRes, pedidosRes] = await Promise.all([
          axios.get("http://localhost:3001/api/productos/listar"),
          axios.get("http://localhost:3001/api/pedidos"),
        ]);

        const productos = productosRes.data;
        const pedidos = pedidosRes.data;

        // Suma total de ventas, excluyendo pedidos cancelados
        const totalVentas = pedidos
          .filter(p => p.estado !== 'cancelado')
          .reduce((acc, p) => acc + Number(p.total || 0), 0);

        const totalPedidos = pedidos.length;

        // Clientes únicos
        const clientesUnicos = new Set(pedidos.map(p => p.nombre_cliente)).size;

        const productosVendidos = {};

        pedidos.forEach(p => {
          if (!p.productos) return;

          let productosArray = [];

          try {
            productosArray = JSON.parse(p.productos);
          } catch (error) {
            console.warn(`Error parseando productos del pedido ${p.id_factura}:`, error);
            return;
          }

          productosArray.forEach(prod => {
            const nombre = prod.nombre?.trim() || 'Desconocido';
            const cantidad = Number(prod.cantidad) || 0;
            productosVendidos[nombre] = (productosVendidos[nombre] || 0) + cantidad;
          });
        });

        // Ordenar y obtener top 5 productos vendidos
        const productosMasVendidos = Object.entries(productosVendidos)
          .map(([nombre, vendidos]) => ({ nombre, vendidos }))
          .sort((a, b) => b.vendidos - a.vendidos)
          .slice(0, 5);

        setEstadisticas({
          totalVentas,
          totalPedidos,
          totalClientes: clientesUnicos,
          totalProductos: productos.length,
          productosMasVendidos
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    cargarEstadisticas();
  }, []);

  const formatoDinero = (num) => {
    return num.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />

      <div style={{ marginLeft: 300, padding: 20, width: "100%" }}>
        <h2 className="mb-4">📊 Estadísticas del eCommerce</h2>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
          <div style={{ flex: '1 1 200px', background: '#007bff', color: '#fff', padding: 20, borderRadius: 10 }}>
            <h4>Total Ganancias</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatoDinero(estadisticas.totalVentas)}</p>
          </div>
          <div style={{ flex: '1 1 200px', background: '#28a745', color: '#fff', padding: 20, borderRadius: 10 }}>
            <h4>Total Pedidos</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{estadisticas.totalPedidos}</p>
          </div>
          <div style={{ flex: '1 1 200px', background: '#17a2b8', color: '#fff', padding: 20, borderRadius: 10 }}>
            <h4>Total Clientes</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{estadisticas.totalClientes}</p>
          </div>
          <div style={{ flex: '1 1 200px', background: '#ffc107', color: '#000', padding: 20, borderRadius: 10 }}>
            <h4>Total Productos</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{estadisticas.totalProductos}</p>
          </div>
        </div>

        <h3 className="mb-3">⭐ Productos Más Vendidos</h3>
        <table className="table table-striped" style={{ maxWidth: 800 }}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Unidades Vendidas</th>
            </tr>
          </thead>
          <tbody>
            {estadisticas.productosMasVendidos.map((prod) => (
              <tr key={prod.nombre /* aquí uso nombre como key único */}>
                <td>{prod.nombre}</td>
                <td>{prod.vendidos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
