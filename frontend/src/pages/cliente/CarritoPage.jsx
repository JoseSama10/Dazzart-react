import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carrito from '../../components/cliente/carrito';
import ModalConfirmacion from '../../components/cliente/ModalConfirmacion';
import '../../Styles/CarritoPage.css';

export default function CarritoPage() {
  const id_usuario = 1;
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-lg-15">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h2 className="mb-0">🛒 Mi Carrito</h2>
            </div>
            <div className="card-body bg-light">
              <Carrito id_usuario={id_usuario} />
            </div>
          </div>
        </div>
      </div>
      <ModalConfirmacion
        show={mostrarModal}
        mensaje={modalMensaje}
        onClose={() => setMostrarModal(false)}
        onIrCarrito={() => {
          setProductoSeleccionado(null); // Limpia el detalle
          setMostrarModal(false);        // Cierra el modal
          navigate('/carrito');          // Navega al carrito
        }}
      />
    </div>
  );
}