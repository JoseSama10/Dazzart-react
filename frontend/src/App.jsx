import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin
import Pedidos from "./pages/admin/pedidos"; 
import VerFactura from "./pages/admin/VerFactura"; 

// Cliente
import ClienteHome from "./pages/cliente/ClienteHome"; // 👈 Tu página principal del e-commerce

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cliente */}
        <Route path="/" element={<ClienteHome />} />

        {/* Admin */}
        <Route path="/admin-pedidos" element={<Pedidos />} /> 
        <Route path="/ver-factura/:id" element={<VerFactura />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
