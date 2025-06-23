CREATE DATABASE IF NOT EXISTS DAZZART;
USE DAZZART;

CREATE TABLE roles (
  id_rol INT(11) NOT NULL PRIMARY KEY,
  nombre_rol VARCHAR(50) NOT NULL
);

-- Insertar roles
INSERT INTO roles (id_rol, nombre_rol) VALUES
(1, 'admin'),
(2, 'cliente');

-- Crear tabla usuario (ya con id_rol bien vinculado)
CREATE TABLE usuario(
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


CREATE TABLE factura(
id_factura  INT auto_increment primary KEY,
Metodo_pago  varchar(255) NOT NULL,
fecha_factura DATE NOT NULL,
estado ENUM ('pagada', 'pendiente', 'cancelada') NOT NULL,
id_usuario INT,
FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE


);

CREATE TABLE categoria(
id_categoria  INT AUTO_INCREMENT PRIMARY KEY,
nombre_categoria varchar(255) NOT NULL,
descripcion_categoria varchar(255) NOT NULL

);

CREATE TABLE producto(
id_producto INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
descripcion varchar(250) NOT NULL,
precio DECIMAL(10,2) NOT NULL,
stock INT NOT NULL,
id_categoria INT NOT NULL,
fecha_creacion DATE NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)

);
CREATE TABLE detalles_factura(
id_detalle_factura INT AUTO_INCREMENT PRIMARY KEY,
cantidad  INT NOT NULL,
subtotal DECIMAL(10,2) NOT NULL,
id_factura INT NOT NULL,
id_producto INT NOT NULL,
FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE CASCADE,
FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE
);



CREATE TABLE subcategoria(
id_subcategoria  INT AUTO_INCREMENT PRIMARY KEY,
nombre_subcategoria varchar(255),
descripcion_subcategoria varchar(255) NOT NULL,
id_categoria INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);
CREATE TABLE  descuento(
id_descuento INT AUTO_INCREMENT PRIMARY KEY,
tipo_descuento ENUM('Producto','Categoria') NOT NULL,
porcentaje DECIMAL(5,2) NOT NULL,
estado_descuento ENUM('Activo','Inactivo') NOT NULL,
id_producto INT ,
id_categoria INT ,
FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE CASCADE
);