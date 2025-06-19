const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Permitir solicitudes desde frontend
app.use(bodyParser.json()); // Parsear JSON

// Rutas de API
app.use('/api/users', userRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
