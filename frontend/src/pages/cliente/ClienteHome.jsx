import React, { useState } from 'react';
import Header from '../../components/cliente/Header';
import Carrusel from '../../components/cliente/Carrusel';
import Footer from '../../components/cliente/Footer';
import MenuLateral from '../../components/cliente/MenuLateral';
import ModalProducto from '../../components/cliente/ModalProducto';
import ProductoDetalle from '../../components/cliente/ProductoDetalle'; // 👈 Asegúrate que esta ruta sea correcta

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Imágenes
import torreChangua from '../../assets/img/torrechangua.png';
import tpgaming from '../../assets/img/tpgaming.jpg';
import tsilver from '../../assets/img/tsilver.png';
import tgold from '../../assets/img/tgold.jpg';

// Estilos CSS
import '../../Styles/ModalProducto.css';

export default function ClienteHome() {
  const [showMenu, setShowMenu] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: 'Torre Changua Gamer',
      imagen: torreChangua,
      descripcion: 'Gabinete con diseño exclusivo, luces LED y ventilación avanzada.'
    },
    {
      id: 2,
      nombre: 'TP Gaming',
      imagen: tpgaming,
      descripcion: 'Procesador potente para gamers exigentes, ideal para streaming.'
    },
    {
      id: 3,
      nombre: 'TSilver Pro',
      imagen: tsilver,
      descripcion: 'Memoria RAM DDR5 de alta velocidad con disipador de calor.'
    },
    {
      id: 4,
      nombre: 'TGold Premium',
      imagen: tgold,
      descripcion: 'Fuente de poder 80 PLUS Gold, silenciosa y eficiente.'
    }
  ];

  return (
    <div className="cliente-home-container">
      <Header onOpenMenu={() => setShowMenu(true)} />

      <main className="container my-4">
        {productoSeleccionado ? (
          // Solo mostrar el detalle del producto
          <ProductoDetalle
            producto={productoSeleccionado}
            onVolver={() => setProductoSeleccionado(null)}
          />
        ) : (
          <>
            <Carrusel />
            <div className="row">
              {productos.map((producto) => (
                <div className="col-md-3 mb-4" key={producto.id}>
                  <div className="card h-100 shadow-sm product-card">
                    <div
                      className="img-container"
                      onClick={() => setProductoSeleccionado(producto)}
                    >
                      <img
                        src={producto.imagen}
                        className="card-img-top"
                        alt={producto.nombre}
                      />
                      <div className="iconos-accion">
                        <span
                          className="icono cuadrado"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductoSeleccionado(producto);
                          }}
                        >
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                        <span
                          className="icono cuadrado"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Agregado ${producto.nombre} al carrito`);
                          }}
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                      </div>
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="text-muted">$ 1.600.000</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {!productoSeleccionado && <Footer />}
      {showMenu && <MenuLateral onClose={() => setShowMenu(false)} />}
    </div>
  );
}