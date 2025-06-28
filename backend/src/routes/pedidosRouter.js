const express = require('express');
const router = express.Router();
const { obtenerPedidos, obtenerPedidoPorId, crearPedido } = require('../controllers/pedidosController');

//Ruta para obtener todos los pedidos
router.get('/', obtenerPedidos);


//Nueva ruta para obtener un solo pedido por ID
router.get('/:id', obtenerPedidoPorId);


// Ruta para crear un pedido
router.post('/', crearPedido);


module.exports = router;

