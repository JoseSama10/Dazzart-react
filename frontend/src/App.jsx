import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductosAdmin from "./pages/admin/productos"; // Asegúrate de que el path sea correcto
import ProductosAñadir from "./pages/admin/añadirproducto"; // Asegúrate de que el path sea correcto
import Categorias from "./pages/admin/categorias"; // Asegúrate de que el path sea correcto
import Subcategorias from "./pages/admin/subcategorias"; // Asegúrate de que

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-productos" element={<ProductosAdmin />} />

        
        <Route path="/agregar-producto" element={<ProductosAñadir />} />
        <Route path="/admin-categorias" element={<Categorias />} />
        <Route path="/admin-subcategorias" element={<Subcategorias />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
