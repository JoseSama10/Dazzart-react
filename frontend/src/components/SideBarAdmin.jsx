import React from "react";

export default function SidebarAdmin() {
  return (
    <>
      {/* Sidebar (versión escritorio) */}
      <div className="sidebar d-none d-md-block bg-dark text-white p-3" style={{ height: "100vh", width: "220px", position: "fixed", top: 0, left: 0 }}>
        <h5>Dazzart Components</h5>
        <ul className="nav flex-column mt-3">
          <li><a className="nav-link text-white" href="/admin-categorias">Categorías</a></li>
          <li><a className="nav-link text-white" href="/admin-subcategorias">Subcategorías</a></li>
          <li><a className="nav-link text-white" href="#">Productos</a></li>
          <li><a className="nav-link text-white" href="#">Descuentos</a></li>
          <li><a className="nav-link text-white" href="#">Pedidos</a></li>
          <li>
            <a className="nav-link text-white" data-bs-toggle="collapse" data-bs-target="#configMenu">Configuración</a>
            <ul className="collapse" id="configMenu">
              <li><a className="nav-link text-white ms-3" href="#">Clientes</a></li>
              <li><a className="nav-link text-white ms-3" href="#">Salir</a></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Sidebar móvil */}
      <button
        className="btn btn-dark d-md-none m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        ☰ Menú
      </button>

      <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="sidebarMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Dazzart Components</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li><a className="nav-link text-white" href="/admin-categorias">Categorías</a></li>
            <li><a className="nav-link text-white" href="/admin-subcategorias">Subcategorías</a></li>
            <li><a className="nav-link text-white" href="#">Productos</a></li>
            <li><a className="nav-link text-white" href="#">Pedidos</a></li>
            <li><a className="nav-link text-white" href="#">Descuentos</a></li>
            <li>
              <a className="nav-link text-white" data-bs-toggle="collapse" href="#configMenuMobile">
                Configuración
              </a>
              <ul className="collapse" id="configMenuMobile">
                <li><a className="nav-link text-white ms-3" href="#">Clientes</a></li>
                <li><a className="nav-link text-white ms-3" href="#">Salir</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
