const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productosController');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

router.use((req, res, next) => {
  console.log(`[Productos Router] ${req.method} ${req.originalUrl}`);
  next();
});

const upload = multer({ storage });

// Rutas sin prefijo productos, porque el router se monta con /productos
// Rutas en router.js
router.get('/listar', productoController.listarProductos);
router.delete('/eliminar/:id', productoController.eliminarProducto);




router.post('/agregar', upload.single('imagen'), productoController.agregarProducto);
router.put('/actualizar/:id', upload.single('imagen'), productoController.actualizarProducto);
// Ruta para servir imágenes
router.get('/img/:filename', productoController.serveImage);

module.exports = router;
