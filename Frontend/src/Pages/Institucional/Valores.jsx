import React from 'react';
import './Valores.css';

function Valores() {
  const cardStyle = {
    flex: "1 1 calc(30% - 1rem)", // Cada tarjeta ocupa aproximadamente un 30% del ancho
    maxWidth: "350px", // Máximo ancho de cada tarjeta
    backgroundColor: "rgb(220, 234, 253, 1)",
    padding: "3rem", // Puedes ajustar este valor para cambiar el tamaño interno de las tarjetas
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    color: "rgb(100, 116, 139)",
    margin: "1rem", // Espaciado entre tarjetas
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "rgb(32, 41, 56,1)"
  };

  const textStyle = {
    fontSize: "1.25rem",
    color: "rgb(32, 41, 56,1)",
  };

  return (
    <div>
      {/* Sección de Valores */}
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ color: "rgb(32, 41, 56,1)", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Nuestros Valores
        </h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Nuestros valores fundamentales guían nuestro trabajo y reflejan el compromiso con la excelencia.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", // Centrar las tarjetas en el contenedor
            gap: "1rem",
          }}
        >
          {/* Valor 1 */}
          <div className="card hover-card" style={cardStyle}>
            <h2 style={titleStyle}>Compromiso</h2>
            <p style={textStyle}>Garantizamos el cumplimiento de plazos y estándares de calidad en cada proyecto.</p>
          </div>

          {/* Valor 2 */}
          <div className="card hover-card" style={cardStyle}>
            <h2 style={titleStyle}>Innovación</h2>
            <p style={textStyle}>Aplicamos tecnologías avanzadas para optimizar recursos y mejorar resultados.</p>
          </div>

          {/* Valor 3 */}
          <div className="card hover-card" style={cardStyle}>
            <h2 style={titleStyle}>Seguridad</h2>
            <p style={textStyle}>Velamos por la seguridad y bienestar de nuestro equipo y colaboradores.</p>
          </div>

          {/* Valor 4 */}
          <div className="card hover-card" style={cardStyle}>
            <h2 style={titleStyle}>Trabajo en Equipo</h2>
            <p style={textStyle}>
              Fomentamos la colaboración para alcanzar juntos los mejores resultados.
            </p>
          </div>

          {/* Valor 5 */}
          <div className="card hover-card" style={cardStyle}>
            <h2 style={titleStyle}>Sostenibilidad</h2>
            <p style={textStyle}>Construimos respetando el entorno y buscando un futuro más sostenible.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Valores;