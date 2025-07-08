const express = require('express');
const cors = require('cors');
const path = require('path');

// Routers
const productosRouter = require('./routes/productosrouter');
const categoriasRouter = require('./routes/categoriasrouter');
const subcategoriasRouter = require('./routes/subcategoriasrouter');

const createApp = () => {
  const app = express();

  // CORS - Permite peticiones desde cualquier origen
  app.use(cors({
    origin: (origin, callback) => {
      console.log('\nRequest origin:', origin);
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }));

  // Middleware para parsear JSON
  app.use(express.json());

  // Middleware de logging de peticiones
  app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.originalUrl}`);
    next();
  });

  // Ruta raíz
  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de DAZZART');
  });

  // Rutas principales
  app.use('/productos', productosRouter);
  app.use('/categorias', categoriasRouter);
  app.use('/subcategorias', subcategoriasRouter);

  // Servir imágenes estáticas desde /public/img
  app.use('/productos/img', express.static(path.join(__dirname, '../public/img')));

  return app;
};

module.exports = createApp;
