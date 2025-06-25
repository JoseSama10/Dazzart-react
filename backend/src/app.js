const express = require('express');
const cors = require('cors');

const productosRouter = require('./routes/productosrouter');
const categoriasRouter = require('./routes/categoriasrouter');
const subcategoriasRouter = require('./routes/subcategoriasrouter');
const userRoutes = require('./routes/userRouter')



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
    res.send('Bienvenido a la API de DAZZART');
  });
  app.use('/api/usuarios', userRoutes);
  app.use('/productos', productosRouter);
  app.use('/categorias', categoriasRouter);
  app.use('/subcategorias', subcategoriasRouter);


  return app;
};

module.exports = createApp;
