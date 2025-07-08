import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderRegistro from '../../components/cliente/HeaderRegistro';
import Footer from '../../components/cliente/Footer';
import axios from 'axios';

const RegistroDazzart = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    cedula: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/usuarios/register', {
        nombre: formData.nombre,
        nombre_usuario: formData.usuario,
        correo_electronico: formData.email,
        telefono: formData.telefono,
        contrasena: formData.password,
        cedula: formData.cedula,
        direccion: formData.direccion
      });

      alert(response.data.message || 'Registro exitoso');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <HeaderRegistro />

      <main className="flex-grow-1 d-flex">
        <section className="col-6 bg-light p-0 d-flex">
          <img
            src="https://cdn.pixabay.com/photo/2021/12/30/12/09/gaming-computer-6903836_1280.jpg"
            alt="Computadora moderna"
            onError={(e) => { e.target.style.display = 'none'; }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)'
            }}
          />
        </section>

        <section className="col-6 d-flex align-items-center justify-content-center p-4">
          <form className="w-100" autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="h3 mb-4 text-center">Regístrate</h1>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" className="form-control" required value={formData.nombre} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Usuario</label>
              <input type="text" id="usuario" name="usuario" className="form-control" required value={formData.usuario} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="cedula" className="form-label">Cédula</label>
              <input type="text" id="cedula" name="cedula" className="form-control" required pattern="\d+" value={formData.cedula} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" id="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" id="password" name="password" className="form-control" required minLength="6" autoComplete="new-password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" className="form-control" required value={formData.telefono} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <textarea id="direccion" name="direccion" className="form-control" rows="3" required value={formData.direccion} onChange={handleChange}></textarea>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary w-100 me-2">Regresar</button>
              <button type="submit" className="btn btn-primary w-100">Continuar</button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RegistroDazzart;