import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './pages/Cliente/Registro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;