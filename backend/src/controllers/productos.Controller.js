// productosController.js
const db = require('../config/db');

exports.obtenerProductos = (req, res) => {
  const query = 'SELECT * FROM producto';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err); 
      return res.status(500).json({ error: 'Error al obtener productos' });
    }

    res.json(results);
  });
};
