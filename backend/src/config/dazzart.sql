-- Crear base de datos
CREATE DATABASE IF NOT EXISTS DAZZART;
USE DAZZART;

-- Crear tabla de roles
CREATE TABLE roles (
  id_rol INT(11) NOT NULL PRIMARY KEY,
  nombre_rol VARCHAR(50) NOT NULL
);

-- Insertar roles
INSERT INTO roles (id_rol, nombre_rol) VALUES
(1, 'admin'),
(2, 'cliente');

-- Crear tabla de usuarios
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  nombre_usuario VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL,
  telefono VARCHAR(255) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  cedula VARCHAR(255) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Crear tabla de categorías
CREATE TABLE categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(255) NOT NULL,
  descripcion_categoria VARCHAR(255) NOT NULL
);

-- Crear tabla de subcategorías
CREATE TABLE subcategoria (
  id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_subcategoria VARCHAR(255),
  descripcion_subcategoria VARCHAR(255) NOT NULL,
  id_categoria INT NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Crear tabla de productos
CREATE TABLE producto (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(250) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  id_categoria INT NOT NULL,
  id_subcategoria INT,
  fecha_creacion DATE NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
  FOREIGN KEY (id_subcategoria) REFERENCES subcategoria(id_subcategoria)
);

-- Tabla de carrito
CREATE TABLE carrito (
  id_carrito INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Crear tabla de facturas
CREATE TABLE factura (
  id_factura INT AUTO_INCREMENT PRIMARY KEY,
  metodo_pago VARCHAR(255) NOT NULL,
  fecha_factura DATE NOT NULL,
  estado ENUM('pagada', 'pendiente', 'cancelada') NOT NULL,
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Crear tabla de detalles de factura
CREATE TABLE detalles_factura (
  id_detalle_factura INT AUTO_INCREMENT PRIMARY KEY,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  id_factura INT NOT NULL,
  id_producto INT NOT NULL,
  FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE
);

-- Crear tabla de pedidos
CREATE TABLE pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  productos TEXT NOT NULL,
  total_productos INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  estado ENUM('pendiente', 'en proceso', 'en camino', 'entregado', 'cancelado') DEFAULT 'pendiente',
  fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Crear tabla de descuentos
CREATE TABLE descuento (
  id_descuento INT AUTO_INCREMENT PRIMARY KEY,
  tipo_descuento ENUM('producto', 'categoria') NOT NULL,
  porcentaje DECIMAL(5,2) NOT NULL,
  estado_descuento ENUM('Activo','Inactivo') NOT NULL,
  id_producto INT,
  id_categoria INT,
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE CASCADE
);
