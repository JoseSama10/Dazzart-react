import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pedidos from "./pages/admin/pedidos"; 
import VerFactura from "./pages/admin/VerFactura"; 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-pedidos" element={<Pedidos />} /> 
        <Route path="/ver-factura/:id" element={<VerFactura />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
