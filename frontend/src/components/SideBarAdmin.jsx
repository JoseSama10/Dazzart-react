import React from "react";
import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <>
      {/* Sidebar para escritorio */}
      <div
        className="sidebar d-none d-md-block bg-dark text-white p-3"
        style={{
          height: "100vh",
          width: "280px",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          zIndex: 1040,
        }}
      >
        <h5>Componentes Dazzart</h5>
        <ul className="nav flex-column mt-3">
          <li><Link className="nav-link text-white" to="/admin-categorias">Categorías</Link></li>
          <li><Link className="nav-link text-white" to="/admin-subcategorias">Subcategorías</Link></li>
          <li><Link className="nav-link text-white" to="/admin-productos">Productos</Link></li>
          <li><Link className="nav-link text-white" to="/admin-descuentos">Descuentos</Link></li>
          <li><Link className="nav-link text-white" to="/admin-pedidos">Pedidos</Link></li>
          <li>
            <a
              className="nav-link text-white"
              data-bs-toggle="collapse"
              href="#configMenu"
              role="button"
              aria-expanded="false"
              aria-controls="configMenu"
            >
              Configuración
            </a>
            <ul className="collapse ps-3" id="configMenu">
              <li><Link className="nav-link text-white" to="/admin-clientes">Clientes</Link></li>
              <li><Link className="nav-link text-white" to="/logout">Salir</Link></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Botón menú móvil */}
      <button
        className="btn btn-dark d-md-none m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        ☰ Menú
      </button>

      {/* Sidebar móvil (offcanvas) */}
      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">Dazzart Components</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li><Link className="nav-link text-white" to="/admin-categorias">Categorías</Link></li>
            <li><Link className="nav-link text-white" to="/admin-subcategorias">Subcategorías</Link></li>
            <li><Link className="nav-link text-white" to="/admin-productos">Productos</Link></li>
            <li><Link className="nav-link text-white" to="/admin-descuentos">Descuentos</Link></li>
            <li><Link className="nav-link text-white" to="/admin-pedidos">Pedidos</Link></li>
            <li>
              <a
                className="nav-link text-white"
                data-bs-toggle="collapse"
                href="#configMenuMobile"
                role="button"
                aria-expanded="false"
                aria-controls="configMenuMobile"
              >
                Configuración
              </a>
              <ul className="collapse ps-3" id="configMenuMobile">
                <li><Link className="nav-link text-white" to="/admin-clientes">Clientes</Link></li>
                <li><Link className="nav-link text-white" to="/logout">Salir</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
