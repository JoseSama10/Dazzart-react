import React, { useState } from 'react';


export default function ProductoDetalle({ producto, onVolver, onAgregarCarrito }) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    if (onAgregarCarrito) {
      onAgregarCarrito(producto, cantidad);
    }
  };

  return (
    <div className="container mt-5">

      <div className="row">
        {/* Imagen del producto */}
        <div className="col-md-6 text-center">
          <img
            src={`/img/${producto.imagen}`}
            className="img-fluid rounded shadow-sm"
            alt={producto.nombre}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h1 className="fw-bold">{producto.nombre}</h1>
          <p className="fs-4 text-primary">$ {producto.precio}</p>

          <div className="input-group mb-3 w-50">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center"
              value={cantidad}
              min="1"
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCantidad(cantidad + 1)}
            >
              +
            </button>
          </div>

          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-primary me-2" onClick={handleAgregar}>
              + Añadir al carrito
            </button>
            <button className="btn btn-success">Comprar ahora</button>
          </div>

          <p className="mt-3 text-muted">{producto.stock} disponibles</p>
        </div>
      </div>

      {/* Tabs con información adicional */}
      <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#desc">
            Descripción
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#info">
            Información Adicional
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#reviews">
            Valoraciones (1)
          </button>
        </li>
      </ul>

      <div className="tab-content p-3 border border-top-0">
        <div className="tab-pane fade show active" id="desc">
          <p>{producto.descripcion}</p>
        </div>
        <div className="tab-pane fade" id="info">
          <ul>
            <li><strong>Conexión:</strong> Inalámbrica LIGHTSPEED y Bluetooth</li>
            <li><strong>Compatibilidad:</strong> PC, Mac, PS5/PS4...</li>
          </ul>
        </div>
        <div className="tab-pane fade" id="reviews">
          <p>★★★★★</p>
          <p><em>“Increíble producto, me encantó...”</em> — Juan Pérez</p>
        </div>
      </div>
    </div>
  );
}
