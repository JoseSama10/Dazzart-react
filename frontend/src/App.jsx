import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin
import Pedidos from "./pages/admin/pedidos"; 
import VerFactura from "./pages/admin/VerFactura"; 

// Cliente
import ClienteHome from "./pages/cliente/ClienteHome"; // 👈 Tu página principal del e-commerce
import CarritoPage from "./pages/cliente/CarritoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cliente */}
        <Route path="/" element={<ClienteHome />} />
        <Route path="/carrito" element={<CarritoPage />} />

        {/* Admin */}
        <Route path="/admin-pedidos" element={<Pedidos />} /> 
        <Route path="/ver-factura/:id" element={<VerFactura />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
