const express = require('express');
const router = express.Router();
const { obtenerProductos } = require('../controllers/productos.Controller');

router.get('/', obtenerProductos);

module.exports = router;