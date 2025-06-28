const express = require('express');
const cors = require('cors');

const pedidosRouter = require('./routes/pedidosRouter');
const carritoRouter = require('./routes/carritoRouter');
const productosRouter = require('./routes/productos.Router');

const createApp = () => {
  const app = express();

  app.use(cors({
    origin: (origin, callback) => {
      console.log('\nrequest origin: ', origin);
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }));

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.originalUrl}`);
    next();
  });

  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de DAZZART (Pedidos)');
  });

  // Solo ruta de pedidos
  app.use('/pedidos', pedidosRouter);
  app.use('/carrito', carritoRouter);
  app.use('/api/productos', productosRouter);

  return app;
};

module.exports = createApp;
