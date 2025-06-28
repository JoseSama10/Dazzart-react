import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/ModalConfirmacion.css'; // Asegúrate de tener este archivo

export default function ModalConfirmacion({ show, mensaje, onClose, onIrCarrito }) {
  const navigate = useNavigate();

  if (!show) return null;

  const irAlCarrito = () => {
    onClose();
    navigate('/carrito');
  };

  return (
    <div className="modal-confirm-backdrop">
      <div className="modal-confirm-container animate-pop">
        <div className="modal-icon">✅</div>
        <h4 className="modal-title">¡Producto agregado!</h4>
        <p className="modal-message">{mensaje}</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-success" onClick={onIrCarrito}>
            Ir al carrito de compras
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
