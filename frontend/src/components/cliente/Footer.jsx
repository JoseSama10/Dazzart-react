import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white' }} className="py-4 mt-auto">
      <div className="container text-center">
        {/* Redes sociales */}
        <div className="row mb-3">
          <div className="col-12">
            <p className="mb-2">Síguenos en:</p>
            <a href="#" style={{ color: 'white', marginRight: 15 }}>
              <i className="fa-brands fa-facebook fa-lg"></i>
            </a>
            <a href="#" style={{ color: 'white', marginRight: 15 }}>
              <i className="fa-brands fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/dazzartcomponents/"
              style={{ color: 'white' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-3 border-light" />

        {/* Derechos reservados */}
        <div className="row">
          <div className="col-12">
            <p className="mb-0">&copy; 2024 Dazzart Components - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
