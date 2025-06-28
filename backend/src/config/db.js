// backend/src/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'valecita', 
  database: 'dazzart'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos MySQL exitosa');
  }
});

module.exports = db;
