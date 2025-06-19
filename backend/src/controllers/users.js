const bcrypt = require('bcrypt');
const db = require('../db');

exports.registerUser = async (req, res) => {
  const {
    nombre,
    nombre_usuario,
    correo_electronico,
    telefono,
    contrasena,
    cedula,
    direccion
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const id_rol = 2; // ID para 'cliente'

    const sql = `
      INSERT INTO usuario 
      (nombre, nombre_usuario, correo_electronico, telefono, contrasena, cedula, direccion, id_rol)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(sql, [
      nombre,
      nombre_usuario,
      correo_electronico,
      telefono,
      hashedPassword,
      cedula,
      direccion,
      id_rol
    ]);

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};
