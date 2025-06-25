import React from "react";
import "../../Styles/ModalProducto.css"; 

export default function ModalProducto({ visible, onClose, imagen, children }) {
  if (!visible) return null;

  return (
    <div className="modal1" id="modalLupa1">
      <div className="modal-contenido">
        <span className="cerrar" onClick={onClose}>&times;</span>
        <div className="modal-imagen">
          <img
            id="imagen-modal"
            src={imagen}
            alt="Imagen del producto"
            className="img-fluid"
          />
        </div>
        <div className="modal-detalles">
          {children}
        </div>
      </div>
    </div>
  );
}
