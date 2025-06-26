const db = require('../config/db');

// Crear un nuevo descuento (similar al formulario de Flask) //
exports.crearDescuento = async (req, res) => {
  const {
    tipo_descuento,
    valor,
    fecha_inicio,
    fecha_fin,
    estado_descuento,
    aplicacion,
    nombre_producto,
    id_categoria
  } = req.body;

  try {
    let productoId = null;

    if (aplicacion === 'producto') {
      const [producto] = await db.query(
        'SELECT id_producto FROM producto WHERE nombre = ?',
        [nombre_producto]
      );

      if (producto.length === 0) {
        return res.status(400).json({ error: 'Producto no encontrado' });
      }

      productoId = producto[0].id_producto;

      const [existe] = await db.query(
        `SELECT 1 FROM descuento d
         JOIN descuento_producto dp ON d.id_descuento = dp.id_descuento
         WHERE dp.id_producto = ? AND d.estado_descuento = 'Activo'`,
        [productoId]
      );

      if (existe.length > 0) {
        return res.status(400).json({ error: 'Ya existe un descuento activo para este producto' });
      }
    }

    if (aplicacion === 'categoria') {
      const [existe] = await db.query(
        `SELECT 1 FROM descuento d
         JOIN descuento_categoria dc ON d.id_descuento = dc.id_descuento
         WHERE dc.id_categoria = ? AND d.estado_descuento = 'Activo'`,
        [id_categoria]
      );

      if (existe.length > 0) {
        return res.status(400).json({ error: 'Ya existe un descuento activo para esta categoría' });
      }
    }

    // Insertar descuento principal //
    const [result] = await db.query(
      `INSERT INTO descuento (tipo_descuento, valor, fecha_inicio, fecha_fin, estado_descuento, aplicacion)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [tipo_descuento, valor, fecha_inicio, fecha_fin, estado_descuento, aplicacion]
    );

    const id_descuento = result.insertId;

    if (aplicacion === 'producto') {
      await db.query(
        'INSERT INTO descuento_producto (id_descuento, id_producto) VALUES (?, ?)',
        [id_descuento, productoId]
      );
    } else if (aplicacion === 'categoria') {
      await db.query(
        'INSERT INTO descuento_categoria (id_descuento, id_categoria) VALUES (?, ?)',
        [id_descuento, id_categoria]
      );
    }

    res.status(201).json({ message: 'Descuento creado correctamente' });
  } catch (error) {
    console.error('Error al crear descuento:', error);
    res.status(500).json({ error: 'Error al crear el descuento' });
  }
};

//  Listar descuentos //
exports.listarDescuentos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.id_descuento, d.tipo_descuento, d.valor, d.fecha_inicio, d.fecha_fin,
             d.estado_descuento, d.aplicacion,
             p.nombre AS nombre_producto,
             c.nombre_categoria AS nombre_categoria
      FROM descuento d
      LEFT JOIN descuento_producto dp ON d.id_descuento = dp.id_descuento
      LEFT JOIN producto p ON dp.id_producto = p.id_producto
      LEFT JOIN descuento_categoria dc ON d.id_descuento = dc.id_descuento
      LEFT JOIN categoria c ON dc.id_categoria = c.id_categoria
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error al listar descuentos:', error);
    res.status(500).json({ error: 'Error al obtener descuentos' });
  }
};

// Eliminar descuento//
exports.eliminarDescuento = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM descuento_producto WHERE id_descuento = ?', [id]);
    await db.query('DELETE FROM descuento_categoria WHERE id_descuento = ?', [id]);
    await db.query('DELETE FROM descuento WHERE id_descuento = ?', [id]);

    res.json({ message: 'Descuento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar descuento:', error);
    res.status(500).json({ error: 'Error al eliminar el descuento' });
  }
};

// Obtener descuento por ID (para edición)//
exports.obtenerDescuentoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM descuento WHERE id_descuento = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Descuento no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener descuento:', error);
    res.status(500).json({ error: 'Error al obtener el descuento' });
  }
};
 //Actualizar descuento//
exports.actualizarDescuento = async (req, res) => {
  const { id } = req.params;
  const { tipo_descuento, valor, fecha_inicio, fecha_fin, estado_descuento } = req.body;

  try {
    await db.query(
      `UPDATE descuento
       SET tipo_descuento = ?, valor = ?, fecha_inicio = ?, fecha_fin = ?, estado_descuento = ?
       WHERE id_descuento = ?`,
      [tipo_descuento, valor, fecha_inicio, fecha_fin, estado_descuento, id]
    );

    res.json({ message: 'Descuento actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar descuento:', error);
    res.status(500).json({ error: 'Error al actualizar el descuento' });
  }
};