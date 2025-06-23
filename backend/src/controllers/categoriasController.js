const db = require('../config/db');

// Listar categorías
exports.listarCategorias = (req, res) => {
  console.log("Petición GET /categorias/listar recibida");

  const query = 'SELECT * FROM categoria';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error en consulta categorías:", err);
      return res.status(500).json({ error: err });
    }

    console.log("Categorías obtenidas:", results);
    res.json(results);
  });
};


// Agregar nueva categoría
exports.agregarCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;

  const query = `
    INSERT INTO categoria (nombre_categoria, descripcion_categoria)
    VALUES (?, ?)
  `;

  db.query(query, [nombre, descripcion], (err) => {
    if (err) {
      console.error('Error al agregar categoría:', err);
      return res.status(500).json({ error: 'No se pudo agregar la categoría' });
    }
    res.json({ message: 'Categoría agregada correctamente' });
  });
};

// Editar categoría
exports.editarCategoria = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const query = `
    UPDATE categoria
    SET nombre_categoria = ?, descripcion_categoria = ?
    WHERE id_categoria = ?
  `;

  db.query(query, [nombre, descripcion, id], (err) => {
    if (err) {
      console.error('Error al editar categoría:', err);
      return res.status(500).json({ error: 'No se pudo editar la categoría' });
    }
    res.json({ message: 'Categoría actualizada correctamente' });
  });
};

// Eliminar categoría
exports.eliminarCategoria = (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM categoria WHERE id_categoria = ?
  `;

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error al eliminar categoría:', err);
      return res.status(500).json({ error: 'No se pudo eliminar la categoría' });
    }
    res.json({ message: 'Categoría eliminada correctamente' });
  });
};
