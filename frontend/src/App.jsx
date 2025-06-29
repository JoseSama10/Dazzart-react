import { BrowserRouter, Routes, Route } from "react-router-dom";



import ProductosAdmin from "./pages/admin/productos"; 
import ProductosAñadir from "./pages/admin/añadirproducto"; 
import EditarProducto from "./pages/admin/editarproducto"; 


import Categorias from "./pages/admin/categorias"; 
import Subcategorias from "./pages/admin/subcategorias"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/admin-productos" element={<ProductosAdmin />} />
        <Route path="/agregar-producto" element={<ProductosAñadir />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />


        <Route path="/admin-categorias" element={<Categorias />} />
        <Route path="/admin-subcategorias" element={<Subcategorias />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
