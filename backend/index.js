const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/register", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  db.query(sql, [nombre, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Error en el servidor", error: err });
    return res.status(200).json({ message: "Usuario registrado exitosamente" });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});