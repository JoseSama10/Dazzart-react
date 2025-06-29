import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoDetalle from './ProductoDetalle'; // Asegúrate de importar el componente
import ModalConfirmacion from './ModalConfirmacion'; // Ajusta la ruta si es necesario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faLightbulb } from '@fortawesome/free-solid-svg-icons';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const navigate = useNavigate();
  const id_usuario = 1; // O el id real del usuario logueado

  useEffect(() => {
    fetch(`http://localhost:3001/carrito/${id_usuario}`)
      .then(res => res.json())
      .then(data => setCarrito(data));
  }, [id_usuario]);

  // Cargar productos recomendados (diferentes a los del carrito)
  useEffect(() => {
    fetch('http://localhost:3001/api/productos')
      .then(res => res.json())
      .then(data => {
        // Filtrar productos que NO estan en el carrito
        const idsEnCarrito = carrito.map(item => item.id_producto);
        const recomendadosFiltrados = data.filter(prod => !idsEnCarrito.includes(prod.id_producto));
        setRecomendados(recomendadosFiltrados.slice(0, 5)); 
      });
  }, [carrito]);

  const eliminarProducto = (id_carrito) => {
    fetch(`http://localhost:3001/carrito/${id_carrito}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setCarrito(carrito.filter(item => item.id_carrito !== id_carrito));
      });
  };

  const comprar = async () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const direccion = "Dirección de prueba"; // Puedes pedirla al usuario
    const total_productos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    try {
      const res = await fetch('http://localhost:3001/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario,
          direccion,
          productos: carrito,
          total_productos,
          total
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('¡Compra realizada con éxito!');
        setCarrito([]);
        // (Opcional) Vacía el carrito en la base de datos
        await fetch(`http://localhost:3001/carrito/vaciar/${id_usuario}`, { method: 'DELETE' });
      } else {
        alert(data.error || 'Error al realizar la compra');
      }
    } catch (err) {
      alert('Error al realizar la compra');
    }
  };

  const volver = () => {
    navigate(-1);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toLocaleString('es-CO');
  };

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
        // Opcional: recargar el carrito
        fetch(`http://localhost:3001/carrito/${id_usuario}`)
          .then(res => res.json())
          .then(data => setCarrito(data));
      })
      .catch((err) => {
        setModalMensaje('Error al agregar al carrito');
        setMostrarModal(true);
      });
  };

  if (productoSeleccionado) {
    return (
      <>
        <ProductoDetalle
          producto={productoSeleccionado}
          onVolver={() => setProductoSeleccionado(null)}
          onAgregarCarrito={agregarAlCarrito}
        />
        <ModalConfirmacion
          show={mostrarModal}
          mensaje={modalMensaje}
          onClose={() => setMostrarModal(false)}
          onIrCarrito={() => {
            setProductoSeleccionado(null); // Limpia el detalle
            setMostrarModal(false);
            navigate('/carrito');
          }}
        />
      </>
    );
  }

  return (
    <div className="container py-4">
      {/* Caja 1: Carrito de compras + resumen */}
      <div className="row gx-4">
        {/* Productos en carrito */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Carrito de compras
              </h5>
            </div>
            <div className="card-body">
              {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {carrito.map(item => (
                    <li key={item.id_carrito} className="list-group-item d-flex justify-content-between align-items-center">
                      <span><strong>{item.nombre}</strong> x {item.cantidad}</span>
                      <button onClick={() => eliminarProducto(item.id_carrito)} className="btn btn-sm btn-outline-danger">×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Resumen de compra</h5>
              <p>Productos: <strong>${calcularTotal()}</strong></p>
              <p>Envío: <span className="text-success">Gratis</span></p>
              <hr />
              <h5>Total: <strong>${calcularTotal()}</strong></h5>
              <button className="btn btn-primary w-100 mt-3" onClick={comprar}>Continuar compra</button>
              <button className="btn btn-secondary w-100 mt-2" onClick={volver}>Volver</button>
            </div>
          </div>
        </div>
      </div>

      {/* Caja 2: Recomendaciones */}
      <div className="card shadow-sm mt-5">
        <div className="card-body">
          <h5 className="mb-4">
            <FontAwesomeIcon icon={faLightbulb} className="me-2 text-warning" />
            Recomendaciones para ti
          </h5>
          <div className="row">
            {recomendados.length > 0 ? (
              recomendados.map(producto => (
                <div className="col-md-3 mb-4" key={producto.id_producto}>
                  <div className="card h-100 border-light shadow-sm">
                    <img
                      src={`/img/${producto.imagen}`}
                      className="card-img-top"
                      alt={producto.nombre}
                      style={{ height: '150px', objectFit: 'contain' }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title">{producto.nombre}</h6>
                      <p className="text-muted">${producto.precio.toLocaleString('es-CO')}</p>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setProductoSeleccionado(producto)}
                      >
                        Ver producto
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No hay productos recomendados.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}