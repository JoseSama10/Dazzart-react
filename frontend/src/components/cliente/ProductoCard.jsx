import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/ProductoCard.css';

export default function ProductoCard({ producto, onVerDetalle, onAgregarCarrito }) {
  return (
    <div className="card h-100 shadow-sm product-card">
      <div className="img-container" onClick={() => onVerDetalle(producto)}>
        <img
          src={`/img/${producto.imagen}`}
          className="card-img-top producto-imagen"
          alt={producto.nombre}
        />
        <div className="iconos-accion">
          <span
            className="icono cuadrado"
            onClick={e => {
              e.stopPropagation();
              onVerDetalle(producto);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <span
            className="icono cuadrado"
            onClick={e => {
              e.stopPropagation();
              onAgregarCarrito(producto);
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </div>
      </div>
      <div className="card-body text-center d-flex flex-column justify-content-between">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="descripcion-producto">{producto.descripcion}</p>
        <p className="text-muted fw-bold">$ {producto.precio}</p>
      </div>
    </div>
  );
}
