import React from "react";
import "../../Styles/MenuLateral.css";

export default function MenuLateral({ onClose }) {
  return (
    <div className="menu-lateral activo">
      <header>
        Menú
        <button className="cerrar-menu" onClick={onClose}>✖</button>
      </header>
      <div className="contenido">
        <h3>Categorías</h3>
        <ul>
          <li><a href="#">Componentes</a></li>
          <li><a href="#">Periféricos</a></li>
          <li><a href="#">Ofertas</a> <span className="etiqueta promo">Nuevo</span></li>
        </ul>
      </div>
    </div>
  );
}
