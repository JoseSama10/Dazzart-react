// src/pages/admin/ActualizarProducto.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

// Asegúrate de ajustar estas URLs según tu backend:
const BASE_URL = "http://localhost:3001";

export default function ActualizarProducto() {
  const { id } = useParams(); // asume route como "/editar-producto/:id"
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numero_serial: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    id_categoria: "",
    fecha_creacion: "",
    imagen: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [imagenesExistentes, setImagenesExistentes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar categorías y lista de nombres de imágenes existentes (si las manejas en tu backend)
  useEffect(() => {
    // 1) obtener categorías
    const cargarCategorias = async () => {
      try {
        // Ajusta endpoint si tu ruta es distinta, aquí asumimos GET /productos/categoria
        const res = await axios.get(`${BASE_URL}/productos/categoria`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    // 2) opcional: obtener lista de imágenes existentes (si tienes un endpoint)
    const cargarImagenes = async () => {
      try {
        // Si tu backend expone un endpoint que lista nombres de imágenes subidas, úsalo:
        // Ejemplo: GET /productos/listar-imagenes  -> devuelve array de strings
        const res = await axios.get(`${BASE_URL}/productos/listar-imagenes`);
        setImagenesExistentes(res.data);
      } catch (error) {
        console.warn("No se pudo cargar imágenes existentes:", error);
        setImagenesExistentes([]);
      }
    };
    cargarCategorias();
    cargarImagenes();
  }, []);

  // Cargar datos del producto a editar
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        // Endpoint para obtener producto por ID: ajusta si tu ruta es distinta, ej GET /productos/listar/:id
        const res = await axios.get(`${BASE_URL}/productos/listar/${id}`);
        const prod = res.data;
        // Prellenar form; formatea fecha a yyyy-MM-dd si viene otra cosa
        let fecha = "";
        if (prod.fecha_creacion) {
          const d = new Date(prod.fecha_creacion);
          // Ajusta zona si es necesario
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          fecha = `${yyyy}-${mm}-${dd}`;
        }
        setForm({
          numero_serial: prod.numero_serial || "",
          nombre: prod.nombre || "",
          descripcion: prod.descripcion || "",
          precio: prod.precio != null ? String(prod.precio) : "",
          stock: prod.stock != null ? String(prod.stock) : "",
          id_categoria: prod.id_categoria != null ? String(prod.id_categoria) : "",
          fecha_creacion: fecha,
          imagen: prod.imagen || "",
        });
      } catch (error) {
        console.error("Error al cargar producto:", error);
        Swal.fire("Error", "No se pudo cargar el producto.", "error");
      } finally {
        setCargando(false);
      }
    };
    if (id) cargarProducto();
    else setCargando(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a tu endpoint PUT. Asegúrate de que reciba JSON y actualice.
      // Si manejas subida de archivo, habría que usar FormData; pero aquí asumimos que
      // seleccionas un nombre de imagen existente o dejas el mismo.
      const payload = {
        numero_serial: form.numero_serial,
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio,
        stock: form.stock,
        id_categoria: form.id_categoria,
        fecha_creacion: form.fecha_creacion,
        imagen: form.imagen,
      };
      const res = await axios.put(`${BASE_URL}/productos/actualizar/${id}`, payload);
      if (res.status === 200) {
        Swal.fire("¡Éxito!", "Producto actualizado correctamente.", "success");
        // Luego puedes redirigir a la lista:
        navigate("/admin-productos");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      Swal.fire("Error", "No se pudo actualizar el producto.", "error");
    }
  };

  if (cargando) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="container-fluid d-flex flex-column vh-100">
      {/* Sidebar escritorio */}
      <div
        className="sidebar d-none d-md-block bg-dark text-white p-3"
        style={{ minHeight: "100vh" }}
      >
        <h5>Dazzart Components</h5>
        <ul className="nav flex-column">
          <li>
            <a href="/admin-categorias" className="nav-link text-white">
              Categorías
            </a>
          </li>
          <li>
            <a href="/admin-subcategorias" className="nav-link text-white">
              Subcategorías
            </a>
          </li>
          <li>
            <a href="/admin-productos" className="nav-link text-white">
              Productos
            </a>
          </li>
          <li>
            <a href="/descuentos" className="nav-link text-white">
              Descuentos
            </a>
          </li>
          <li>
            <a href="/pedidos" className="nav-link text-white">
              Pedidos
            </a>
          </li>
          <li>
            <a
              className="nav-link text-white"
              data-bs-toggle="collapse"
              href="#configMenu"
              role="button"
              aria-expanded="false"
              aria-controls="configMenu"
            >
              Configuración
            </a>
            <ul className="collapse list-unstyled ps-3" id="configMenu">
              <li>
                <a href="/clientes" className="nav-link text-white">
                  Clientes
                </a>
              </li>
              <li>
                <a href="/logout" className="nav-link text-white">
                  Salir
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Botón menú móvil */}
      <button
        className="btn btn-dark d-md-none m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        ☰ Menú
      </button>

      {/* Sidebar móvil */}
      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="sidebarMenuLabel" className="offcanvas-title">
            Dazzart Components
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li>
              <a href="/categorias" className="nav-link text-white">
                Categorías
              </a>
            </li>
            <li>
              <a href="/subcategorias" className="nav-link text-white">
                Subcategorías
              </a>
            </li>
            <li>
              <a href="/admin-productos" className="nav-link text-white">
                Productos
              </a>
            </li>
            <li>
              <a href="/pedidos" className="nav-link text-white">
                Pedidos
              </a>
            </li>
            <li>
              <a href="/descuentos" className="nav-link text-white">
                Descuentos
              </a>
            </li>
            <li>
              <a
                className="nav-link text-white"
                data-bs-toggle="collapse"
                href="#configMenuMobile"
                role="button"
                aria-expanded="false"
                aria-controls="configMenuMobile"
              >
                Configuración
              </a>
              <ul className="collapse list-unstyled ps-3" id="configMenuMobile">
                <li>
                  <a href="/clientes" className="nav-link text-white">
                    Clientes
                  </a>
                </li>
                <li>
                  <a href="/logout" className="nav-link text-white">
                    Salir
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="main-content p-4">
        <h1>Actualizar Producto</h1>
        <form
          className="p-4 bg-light rounded shadow-sm w-75 row"
          onSubmit={handleSubmit}
        >
          {/* Columna izquierda */}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="numero_serial" className="form-label">
                Serial
              </label>
              <input
                type="text"
                id="numero_serial"
                name="numero_serial"
                className="form-control"
                placeholder="12SFS134"
                required
                value={form.numero_serial}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Producto
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="hpprobook"
                required
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="3"
                className="form-control"
                placeholder="Descripción del producto"
                required
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                className="form-control"
                placeholder="$16000000"
                required
                value={form.precio}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Unidades
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-control"
                placeholder="20"
                required
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="id_categoria" className="form-label">
                Categoría
              </label>
              <select
                id="id_categoria"
                name="id_categoria"
                className="form-select"
                required
                value={form.id_categoria}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="fecha_creacion" className="form-label">
                Fecha de Creación
              </label>
              <input
                type="date"
                id="fecha_creacion"
                name="fecha_creacion"
                className="form-control"
                required
                value={form.fecha_creacion}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen del producto
              </label>
              <select
                id="imagen"
                name="imagen"
                className="form-select"
                value={form.imagen}
                onChange={handleChange}
              >
                <option value="">Selecciona una imagen existente</option>
                {imagenesExistentes.map((img) => (
                  <option key={img} value={img}>
                    {img}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-dark">
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
