const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

// Listar todos los productos
exports.listarProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM producto');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

// Listar imágenes en /public/img
// ✅ Controlador
exports.listarImagenes = async (req, res) => {
  try {
    const imgDir = path.join(__dirname, '../public/img');
    const files = await fs.promises.readdir(imgDir);
    const imagenes = files.filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f));
    res.json({ imagenes });
  } catch (error) {
    res.status(500).json({ error: 'Error al listar imágenes' });
  }
};


// Obtener un producto por ID
exports.obtenerProducto = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Agregar un nuevo producto
exports.agregarProducto = async (req, res) => {
  try {
    const {
      numero_serial,
      nombre,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_subcategoria,
      fecha_creacion
    } = req.body;

    const imagen = req.file?.filename || req.body.imagen;

    await pool.query(
      `INSERT INTO producto (numero_serial, nombre, descripcion, precio, stock, id_categoria, id_subcategoria, fecha_creacion, imagen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [numero_serial, nombre, descripcion, precio, stock, id_categoria, id_subcategoria || null, fecha_creacion, imagen]
    );

    res.json({ message: 'Producto agregado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
};



exports.actualizarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      numero_serial,
      nombre,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_subcategoria,
      imagen // nombre de imagen (string)
    } = req.body;

    // 1. Obtener el producto actual para tomar la fecha_creacion
    const [rows] = await pool.query(
      "SELECT fecha_creacion, imagen FROM producto WHERE id_producto = ?", [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const fechaCreacionActual = rows[0].fecha_creacion;
    const imagenActual = rows[0].imagen;

    // 2. Gestionar la imagen (igual que antes)
    let nuevaImagen = imagenActual;
    if (req.file) {
      nuevaImagen = req.file.filename;
      // borrar imagen antigua si existe...
    } else if (imagen && imagen !== imagenActual) {
      nuevaImagen = imagen;
    }

    // 3. Ejecutar UPDATE usando fechaCreacionActual para no enviarla null
    await pool.query(
      `UPDATE producto SET numero_serial=?, nombre=?, descripcion=?, precio=?, stock=?, id_categoria=?, id_subcategoria=?, fecha_creacion=?, imagen=? WHERE id_producto=?`,
      [
        numero_serial || null,
        nombre,
        descripcion,
        precio,
        stock,
        id_categoria,
        id_subcategoria || null,
        fechaCreacionActual,  // Aquí nunca será null
        nuevaImagen,
        id
      ]
    );

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};




// Eliminar producto y su imagen si existe
exports.eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;

    // Consultar imagen asociada
    const [rows] = await pool.query('SELECT imagen FROM producto WHERE id_producto = ?', [id]);
    if (rows.length && rows[0].imagen) {
      const filePath = path.join(__dirname, '../public/img', rows[0].imagen);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // Eliminar archivo si existe
    }

    await pool.query('DELETE FROM producto WHERE id_producto = ?', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
