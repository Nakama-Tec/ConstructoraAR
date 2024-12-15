import React from 'react';
import './Valores.css';

function Valores() {
  return (
    <div>
      <section className="container">
        <h1 className="title">Nuestros Valores</h1>
        <p className="description">
          Nuestros valores fundamentales guían nuestro trabajo y reflejan el compromiso con la excelencia.
        </p>

        <div className="card-container">
          <div className="card hover-card">
            <h2 className="card-title">Compromiso</h2>
            <p className="card-text">
              Garantizamos el cumplimiento de plazos y estándares de calidad en cada proyecto.
            </p>
          </div>

          <div className="card hover-card">
            <h2 className="card-title">Innovación</h2>
            <p className="card-text">
              Aplicamos tecnologías avanzadas para optimizar recursos y mejorar resultados.
            </p>
          </div>

          <div className="card hover-card">
            <h2 className="card-title">Seguridad</h2>
            <p className="card-text">
              Velamos por la seguridad y bienestar de nuestro equipo y colaboradores.
            </p>
          </div>

          <div className="card hover-card">
            <h2 className="card-title">Trabajo en Equipo</h2>
            <p className="card-text">
              Fomentamos la colaboración para alcanzar juntos los mejores resultados.
            </p>
          </div>

          <div className="card hover-card">
            <h2 className="card-title">Sostenibilidad</h2>
            <p className="card-text">
              Construimos respetando el entorno y buscando un futuro más sostenible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Valores;
