const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.listarSubcategorias = (req, res) => {
  const sql = `
    SELECT s.*, c.nombre_categoria
    FROM subcategoria s
    JOIN categoria c ON s.id_categoria = c.id_categoria
    ORDER BY s.id_subcategoria DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener subcategorías' });
    }
    res.json(results);
  });
};

exports.listarSubcategoriasPorCategoria = (req, res) => {
  const id_categoria = req.params.id_categoria;
  db.query(
    'SELECT * FROM subcategoria WHERE id_categoria = ?',
    [id_categoria],
    (err, results) => {
      if (err) {
        console.error('Error al listar subcategorias por categoria:', err);
        return res.status(500).json({ error: 'Error al obtener subcategorías' });
      }
      res.json(results);
    }
  );
};

exports.agregarSubcategoria = (req, res) => {
  const { nombre_subcategoria, descripcion_subcategoria, id_categoria } = req.body;
  if (!id_categoria || !descripcion_subcategoria) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  db.query(
    'INSERT INTO subcategoria (nombre_subcategoria, descripcion_subcategoria, id_categoria) VALUES (?, ?, ?)',
    [nombre_subcategoria, descripcion_subcategoria, id_categoria],
    (err, result) => {
      if (err) {
        console.error('Error al agregar subcategoria:', err);
        return res.status(500).json({ error: 'Error al agregar subcategoría' });
      }
      res.status(201).json({ message: 'Subcategoría agregada', id: result.insertId });
    }
  );
};

exports.editarSubcategoria = (req, res) => {
  const id_subcategoria = req.params.id_subcategoria;
  const { nombre_subcategoria, descripcion_subcategoria, id_categoria } = req.body;

  if (!id_categoria || !descripcion_subcategoria) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  db.query(
    'UPDATE subcategoria SET nombre_subcategoria = ?, descripcion_subcategoria = ?, id_categoria = ? WHERE id_subcategoria = ?',
    [nombre_subcategoria, descripcion_subcategoria, id_categoria, id_subcategoria],
    (err) => {
      if (err) {
        console.error('Error al actualizar subcategoria:', err);
        return res.status(500).json({ error: 'Error al actualizar subcategoría' });
      }
      res.json({ message: 'Subcategoría actualizada' });
    }
  );
};

exports.eliminarSubcategoria = (req, res) => {
  const id_subcategoria = req.params.id_subcategoria;
  db.query('DELETE FROM subcategoria WHERE id_subcategoria = ?', [id_subcategoria], (err) => {
    if (err) {
      console.error('Error al eliminar subcategoria:', err);
      return res.status(500).json({ error: 'Error al eliminar subcategoría' });
    }
    res.json({ message: 'Subcategoría eliminada' });
  });
};
