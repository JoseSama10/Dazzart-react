const db = require('../config/db');

const obtenerPedidos = (req, res) => {
  const sql = `
    SELECT 
      p.id_factura,
      p.direccion,
      u.nombre AS nombre_cliente,
      p.productos,
      p.total_productos,
      p.total,
      p.estado
    FROM pedidos p
    INNER JOIN usuario u ON p.id_usuario = u.id_usuario
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener pedidos:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(results);
  });
};

const obtenerPedidoPorId = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      p.id_factura,
      p.direccion,
      u.nombre AS nombre_cliente,
      p.productos,
      p.total_productos,
      p.total,
      p.estado
    FROM pedidos p
    INNER JOIN usuario u ON p.id_usuario = u.id_usuario
    WHERE p.id_factura = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el pedido:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(results[0]);
  });
};

const crearPedido = (req, res) => {
  const { id_usuario, direccion, productos, total_productos, total } = req.body;

  // Extrae solo los nombres (o nombre y cantidad)
  const nombresProductos = productos.map(p => p.nombre).join(', ');
  // Si quieres nombre y cantidad: productos.map(p => `${p.nombre} x${p.cantidad}`).join(', ');

  const sql = `
    INSERT INTO pedidos (id_usuario, direccion, productos, total_productos, total, estado)
    VALUES (?, ?, ?, ?, ?, 'pendiente')
  `;
  db.query(
    sql,
    [id_usuario, direccion, nombresProductos, total_productos, total],
    (err, result) => {
      if (err) {
        console.error('Error al crear pedido:', err);
        return res.status(500).json({ error: 'Error al crear el pedido' });
      }
      res.json({ message: 'Pedido creado exitosamente', id_factura: result.insertId });
    }
  );
};

module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
};
