const db = require('../config/db');

// Obtener el carrito de un usuario
exports.obtenerCarrito = (req, res) => {
  const { id_usuario } = req.params;
  const sql = `
    SELECT c.id_carrito, c.cantidad, p.*
    FROM carrito c
    JOIN producto p ON c.id_producto = p.id_producto
    WHERE c.id_usuario = ?
  `;
  db.query(sql, [id_usuario], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el carrito' });
    res.json(results);
  });
};

// Agregar producto al carrito
exports.agregarProducto = (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;
  // Verificar si ya existe el producto en el carrito
  const checkSql = 'SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?';
  db.query(checkSql, [id_usuario, id_producto], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al verificar el carrito' });
    if (results.length > 0) {
      // Si existe, actualizar la cantidad
      const updateSql = 'UPDATE carrito SET cantidad = cantidad + ? WHERE id_usuario = ? AND id_producto = ?';
      db.query(updateSql, [cantidad, id_usuario, id_producto], (err2) => {
        if (err2) return res.status(500).json({ error: 'Error al actualizar el carrito' });
        res.json({ message: 'Cantidad actualizada en el carrito' });
      });
    } else {
      // Si no existe, insertar nuevo
      const insertSql = 'INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES (?, ?, ?)';
      db.query(insertSql, [id_usuario, id_producto, cantidad], (err2) => {
        if (err2) return res.status(500).json({ error: 'Error al agregar al carrito' });
        res.json({ message: 'Producto agregado al carrito' });
      });
    }
  });
};

// Eliminar producto del carrito
exports.eliminarProducto = (req, res) => {
  const { id_carrito } = req.params;
  const sql = 'DELETE FROM carrito WHERE id_carrito = ?';
  db.query(sql, [id_carrito], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    res.json({ message: 'Producto eliminado del carrito' });
  });
};

// Vaciar carrito de un usuario
exports.vaciarCarrito = (req, res) => {
  const { id_usuario } = req.params;
  const sql = 'DELETE FROM carrito WHERE id_usuario = ?';
  db.query(sql, [id_usuario], (err) => {
    if (err) return res.status(500).json({ error: 'Error al vaciar el carrito' });
    res.json({ message: 'Carrito vaciado' });
  });
};