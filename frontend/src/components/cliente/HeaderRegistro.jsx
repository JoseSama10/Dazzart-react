import React from 'react'; 
import '../../css/CSS/Header.css';

export default function HeaderRegistro() {
  return (
  <header className="site-header py-3 bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center g-3">
  
            {/* Logo como texto */}
            <div className="col-auto d-flex align-items-center">
              <a href="/" className="navbar-brand text-logo">
                Dazzart <span>Components</span>
              </a>
            </div>
  
         
          </div>
        </div>
      </header>
  );
}
