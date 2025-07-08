import React, { useEffect, useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faCrown, faBan } from '@fortawesome/free-solid-svg-icons';
import '../../css/CSS/ModalProducto.css'; // Unificar estilos modernos
import axios from 'axios';

export default function ModalLogin({ visible, onClose, onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBienvenida, setShowBienvenida] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (visible) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
    return () => body.classList.remove('modal-open');
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setCorreo('');
      setContrasena('');
      setError('');
      setShowBienvenida(false);
      setShowErrorModal(false);
    }
  }, [visible]);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/login/login', {
        correo_electronico: correo,
        contrasena
      });
      const data = res.data;
      console.log('Usuario recibido:', data.user); // <-- Debug para ver el id_rol
      if (!data.token) {
        setError(data.message || 'Credenciales incorrectas');
        setShowErrorModal(true);
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.user));
      if (onLoginSuccess) onLoginSuccess(data.user);
      setError('');
      setLoading(false);
      // Solo mostrar modal de bienvenida si es admin (id_rol === 1)
      if (Number(data.user.id_rol) === 1) {
        setShowBienvenida(true);
        // NO cerrar el modal aquí, solo cuando el admin cierre el modal de bienvenida
      } else {
        onClose(); // Cierra el modal directamente si es cliente
      }
    } catch (err) {
      setError('Error de red o servidor.');
      setShowErrorModal(true);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // setUsuario(null);
    window.location.replace('/');
  };

  return (
    <>
      {/* Fondo del modal que permite cerrar al hacer click afuera */}
      {visible && (
        <div
          className="modal1"
          style={{zIndex: 9999, position: 'fixed', inset: 0}}
          onClick={onClose}
        >
          <div
            className="modal-contenido"
            style={{maxWidth: 400, minHeight: 0, flexDirection: 'column', gap: '1.2rem', alignItems: 'center', justifyContent: 'center'}}
            onClick={e => e.stopPropagation()}
          >
            <div className="cerrar" onClick={onClose}>&times;</div>
            <h4 className="modal-title fw-semibold" style={{color:'#0084ff', textAlign:'center', marginBottom:'1.2rem'}}>Iniciar Sesión</h4>
            <form onSubmit={handleSubmit} style={{width:'100%'}}>
              <div className="mb-4 input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                <input
                  type="email"
                  className="form-control rounded-2 border"
                  id="correo"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                  required
                  placeholder="Correo electrónico"
                  aria-label="Correo electrónico"
                />
              </div>
              <div className="mb-4 input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                <input
                  type="password"
                  className="form-control rounded-2 border"
                  id="contrasena"
                  value={contrasena}
                  onChange={e => setContrasena(e.target.value)}
                  required
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                />
              </div>
              <button className="agregar-carrito w-100 d-flex align-items-center justify-content-center gap-2" type="submit" disabled={loading}>
                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
              </button>
            </form>
            <div className="d-flex justify-content-between mt-4 px-1 w-100">
              <button className="btn btn-link p-0" style={{ color: '#666' }} onClick={() => alert('Funcionalidad próximamente')}>
                ¿Olvidó su contraseña?
              </button>
              <button className="btn btn-link p-0" style={{ color: '#666' }} onClick={() => window.location.href = '/registro'}>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modales de confirmación y error */}
      <ModalConfirmacion
        show={showBienvenida}
        mensaje={
          <div style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '1.15rem',
            background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
            borderRadius: '14px',
            padding: '22px 10px 12px 10px',
            boxShadow: '0 2px 24px 0 #232526cc',
            color: '#fff',
            border: '1.5px solid #bfa14a',
            letterSpacing: '0.5px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '3.5rem',
                color: '#fff',
                background: 'linear-gradient(135deg, #ffd700 0%, #bfa14a 100%)',
                borderRadius: '50%',
                padding: '10px',
                boxShadow: '0 0 16px #bfa14acc',
                animation: 'pop 0.6s',
                animationIterationCount: '1'
              }}>
                <FontAwesomeIcon icon={faCrown} style={{ color: '#ffd700', fontSize: '2.5rem' }} />
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '6px', color: '#ffd700', textShadow: '0 1px 8px #bfa14a99' }}>¡Bienvenido administrador!</div>
            <div style={{ fontSize: '1.05rem', color: '#bdbdbd' }}>Acceso concedido</div>
            <style>{`
              @keyframes pop {
                0% { transform: scale(0.7); opacity: 0.5; }
                60% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
              }
            `}</style>
          </div>
        }
        onClose={() => {
          setShowBienvenida(false);
          onClose();
        }}
        textoBoton="Ir a administración"
        titulo="Bienvenido"
        icono=""
        onIrCarrito={() => {
          setShowBienvenida(false);
          onClose();
          window.location.href = '/admin-estadisticas';
        }}
      />
      <ModalConfirmacion
        show={showErrorModal}
        mensaje={
          <div style={{
            textAlign:'center',
            fontWeight:'500',
            fontSize:'1.15rem',
            background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
            borderRadius: '14px',
            padding: '22px 10px 12px 10px',
            boxShadow: '0 2px 24px 0 #232526cc',
            color:'#fff',
            border: '1.5px solid #444',
            letterSpacing: '0.5px'
          }}>
            <div style={{marginBottom: '12px'}}>
              <span style={{
                display: 'inline-block',
                fontSize: '3.5rem',
                color: '#fff',
                background: 'linear-gradient(135deg, #757f9a 0%, #232526 100%)',
                borderRadius: '50%',
                padding: '10px',
                boxShadow: '0 0 16px #232526cc',
                animation: 'shake 0.5s',
                animationIterationCount: '1'
              }}>
                <FontAwesomeIcon icon={faBan} style={{ color: '#fff', fontSize: '2.5rem' }} />
              </span>
            </div>
            <div style={{fontSize:'1.4rem', fontWeight:'bold', marginBottom:'6px', color:'#fff'}}>¡Credenciales incorrectas!</div>
            <div style={{fontSize:'1.05rem', color:'#bdbdbd'}}>Intenta nuevamente</div>
            <style>{`
              @keyframes shake {
                0% { transform: translateX(0); }
                20% { transform: translateX(-8px); }
                40% { transform: translateX(8px); }
                60% { transform: translateX(-8px); }
                80% { transform: translateX(8px); }
                100% { transform: translateX(0); }
              }
            `}</style>
          </div>
        }
        onClose={() => setShowErrorModal(false)}
        textoBoton="Cerrar"
        titulo=""
        icono=""
      />
    </>
  );
}
