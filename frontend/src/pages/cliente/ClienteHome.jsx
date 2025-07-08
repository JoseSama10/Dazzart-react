import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importa useNavigate

/* Componentes propios */
import Header from '../../components/cliente/Header';
import Carrusel from '../../components/cliente/Carrusel';
import Footer from '../../components/cliente/Footer';
import MenuLateral from '../../components/cliente/MenuLateral';
import ProductoDetalle from '../../components/cliente/ProductoDetalle';
import ProductoCard from '../../components/cliente/ProductoCard';
import Carrito from '../../components/cliente/carrito';
import ModalConfirmacion from '../../components/cliente/ModalConfirmacion';

/* Estilos globales/extra */
import '../../Styles/ModalProducto.css';

export default function ClienteHome() {
  const [showMenu, setShowMenu] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');

  const id_usuario = 1; // Esto deberías conectarlo con auth real después
  const navigate = useNavigate(); // <-- Inicializa useNavigate

  const agregarAlCarrito = (producto, cantidad = 1) => {
    fetch('http://localhost:3001/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        id_producto: producto.id_producto,
        cantidad,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al agregar al carrito');
        return res.json();
      })
      .then((data) => {
        setModalMensaje(data.message || 'Producto agregado al carrito');
        setMostrarModal(true);
      })
      .catch((err) => {
        console.error(err);
        setModalMensaje('Error al agregar al carrito');
        setMostrarModal(true);
      });
  };

  useEffect(() => {
  fetch('http://localhost:3001/api/productos')
    .then(res => res.json())
    .then(data => setProductos(data))
    .catch(error => console.error('Error al obtener productos:', error));
}, []);


  return (
    <div className="cliente-home-container">
      <Header
        onOpenMenu={() => setShowMenu(true)}
        onOpenCarrito={() => navigate('/carrito')} // <-- Redirige a la página de carrito
      />

      <main className="container my-4">
        {productoSeleccionado ? (
          <ProductoDetalle
            producto={productoSeleccionado}
            onVolver={() => setProductoSeleccionado(null)}
            onAgregarCarrito={agregarAlCarrito}
          />
        ) : (
          <>
            <Carrusel />

            <div className="row">
              {productos.map((producto) => (
                <div className="col-md-3 mb-4" key={producto.id_producto}>
                  <ProductoCard
                    producto={producto}
                    onVerDetalle={setProductoSeleccionado}
                    onAgregarCarrito={agregarAlCarrito}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {!productoSeleccionado && <Footer />}
      {showMenu && <MenuLateral onClose={() => setShowMenu(false)} />}
      {mostrarCarrito && (
        <Carrito id_usuario={id_usuario} onClose={() => setMostrarCarrito(false)} />
      )}

      {/* Modal de confirmación */}
      <ModalConfirmacion
        show={mostrarModal}
        mensaje={modalMensaje}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
}
