const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// Listar productos
exports.listarProductos = (req, res) => {
  console.log("Petición GET /productos recibida");
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) {
      console.error("Error en consulta productos:", err);
      return res.status(500).json({ error: err });
    }
    console.log("Productos obtenidos:", results);
    res.json(results);
  });
};

exports.eliminarProducto = (req, res) => {
  const { id } = req.params; // ✅ Extrae el ID correctamente desde la URL

  const query = `DELETE FROM producto WHERE id_producto = ?`; // ✅ Consulta válida si haces "eliminación lógica"

  db.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Error al eliminar el producto" });
    }

    if (resultado.affectedRows > 0) {
      res.json({ message: `Producto con ID ${id} eliminado correctamente.` });
    } else {
      res.status(404).json({ message: `No se encontró un producto con el ID ${id}` });
    }
  });

  console.log('Controlador eliminarProducto llamado con id:', id); // ✅ Log para verificar si llega la solicitud
};





// Agregar producto
exports.agregarProducto = (req, res) => {
  const {
    numero_serial,
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria,
    fecha_creacion,
    imagen
  } = req.body;

  const imagen_subida = req.file ? req.file.filename : req.body.imagen || null;

  const sql = `
    INSERT INTO producto (numero_serial, nombre, descripcion, precio, stock, id_categoria, fecha_creacion, imagen)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [numero_serial, nombre, descripcion, precio, stock, id_categoria, fecha_creacion, imagen_subida], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto agregado correctamente' });
  });
};

// Obtener producto por ID
exports.obtenerProducto = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

// Actualizar producto
exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const {
    numero_serial,
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria,
    imagen
  } = req.body;

  const nuevaImagen = req.file ? req.file.filename : imagen;

  const sql = `
    UPDATE producto
    SET numero_serial = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, imagen = ?
    WHERE id_producto = ?
  `;

  db.query(sql, [numero_serial, nombre, descripcion, precio, stock, id_categoria, nuevaImagen, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto actualizado correctamente' });
  });
};


// Servir imágenes
exports.serveImage = (req, res) => {
  const filename = req.params.filename;
  const imgPath = path.join(__dirname, '../uploads', filename);

  if (fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    res.status(404).send('Imagen no encontrada');
  }
};
