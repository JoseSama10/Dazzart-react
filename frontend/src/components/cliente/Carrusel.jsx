import React from 'react';

// Importar imagenes desde src/assets/img/
import banner1 from '../../assets/img/2023-3-banner-scaled (1).jpg';
import banner2 from '../../assets/img/banners-web-GT-1 (1).jpg';
import banner3 from '../../assets/img/BANNER_MI_PC_4 (1).jpg';

export default function Carrusel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide my-4"
      data-bs-ride="carousel"
      data-bs-interval="3000" // <-- tiempo entre slides (en milisegundos)
      data-bs-wrap="true"     // <-- para que se repita infinitamente
    >
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />
      </div>

      {/* Imágenes del carrusel */}
      <div className="carousel-inner mx-auto w-75">
        <div className="carousel-item active">
          <img src={banner1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={banner2} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>

      {/* Controles anterior/siguiente */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}
