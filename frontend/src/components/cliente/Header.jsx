import React from 'react';
import logo from '../../assets/img/Captura de pantalla 2024-11-25 183458.png';   // ← importa la imagen

export default function Header({ onOpenMenu }) {
  return (
    <header className="container-fluid py-2 shadow-sm">
      <div className="row align-items-center">
        {/* Logo */}
        <div className="col-3">
          <a href="/">
            <img
              src={logo}             // ← usa la variable importada
              alt="Logo"
              className="img-fluid"
            />
          </a>
        </div>

        {/* Menú de categorías */}
        <div className="col-1 text-center me-5">
          <button className="btn btn-outline-primary" onClick={onOpenMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="col-3 text-start ms-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <button className="btn ms-2">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Botones: login y carrito */}
        <div className="col-3 d-flex justify-content-end p-3 ml-6 mt-1">
          <button id="login-btn" className="btn btn-outline-info me-2">
            <i className="fa-solid fa-user"></i>
          </button>
          <a href="/compras" className="btn btn-outline-warning">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
