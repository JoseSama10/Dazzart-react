import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../css/CSS/Header.css';

export default function Header({ onOpenMenu, onOpenCarrito }) {
  return (
    <header className="site-header py-3 bg-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center g-3">

          {/* Logo como texto */}
          <div className="col-auto d-flex align-items-center">
            <a href="/" className="navbar-brand text-logo">
              Dazzart <span>Components</span>
            </a>
          </div>

          {/* Botón menú */}
          <div className="col-auto">
            <button className="btn btn-outline-primary header-btn" onClick={onOpenMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          {/* Barra de búsqueda mejorada */}
          <div className="col flex-grow-1 d-flex justify-content-end">
            <div className="search-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar productos..."
              />
            </div>
          </div>

          {/* Iconos usuario y carrito */}
          <div className="col-auto d-flex align-items-center gap-2">
            <button className="btn btn-outline-info header-btn">
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button className="btn btn-outline-warning header-btn" onClick={onOpenCarrito}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
