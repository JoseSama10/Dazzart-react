import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsuariosAdmin from "./pages/admin/GestionUsuarios";
import AgregarUsuario from "./pages/admin/AgregarUsuarios";
import EditarUsuario from "./pages/admin/EditarUsuario";
import DescuentosAdmin  from "./pages/admin/Descuento";
import FormularioDescuento from "./pages/admin/FormularioDescuento";
import EditarDescuento from "./pages/admin/EditarDescuento";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-usuarios" element={<UsuariosAdmin/>}/>
        <Route path="/agregar-usuarios" element={<AgregarUsuario/>}/>
   
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/admin-descuento" element={<DescuentosAdmin/>}/>
        <Route path="/agregar-descuento" element={<FormularioDescuento/>}/>
        <Route path="/editar-descuento/:id"  element={<EditarDescuento/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;