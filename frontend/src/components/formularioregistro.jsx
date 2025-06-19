import { useState } from 'react';
import axios from 'axios';
import styles from './Registro.module.css'

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    nombre_usuario: '',
    correo_electronico: '',
    telefono: '',
    contrasena: '',
    cedula: '',
    direccion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/users/register', formData);
      alert('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" name="nombre" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa tu nombre.</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Usuario</label>
        <input type="text" className="form-control" name="nombre_usuario" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa un nombre de usuario.</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Cédula</label>
        <input type="text" className="form-control" name="cedula" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa tu número de identificación.</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" name="correo_electronico" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa un correo válido.</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" name="contrasena" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa una contraseña.</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Teléfono</label>
        <input type="tel" className="form-control" name="telefono" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa un número de teléfono válido.</div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Dirección</label>
        <input type="text" className="form-control" name="direccion" onChange={handleChange} required />
        <div className="invalid-feedback">Por favor ingresa una dirección.</div>
      </div>
      <div className={styles.buttonContainer}>
        <a href="/" className="btn btn-custom">Volver</a>
        <button type="submit" className="btn btn-custom">Registrar</button>
      </div>
    </form>
  );
}

export default RegisterForm;