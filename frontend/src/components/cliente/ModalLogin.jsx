import React, { useEffect } from 'react';

export default function ModalLogin({ visible, onClose, children }) {
  useEffect(() => {
    const body = document.body;
    if (visible) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }

    return () => body.classList.remove('modal-open');
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="modal fade show"
      id="login-modal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-modal="true"
      role="dialog"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Cuerpo del modal */}
          <div className="modal-body">
            {children /* Puedes pasar tu formulario de login aquí */}
          </div>

          {/* Footer opcional */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button className="btn btn-primary">Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
