import React, { useState } from 'react';
import './App.css';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="app">
      {!showCalculator ? (
        // Pantalla de Bienvenida
        <div className="welcome-container">
          <h1>Bienvenido a la calculadora</h1>
          <button 
            className="start-button" 
            onClick={() => setShowCalculator(true)}
          >
            Inicie aquí
          </button>
        </div>
      ) : (
        // Pantalla de Calculadora (placeholder)
        <div className="calculator-container">
          <h2>Calculadora</h2>
          <p>(Aquí iría el componente de calculadora)</p>
          <button 
            className="back-button" 
            onClick={() => setShowCalculator(false)}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
}

export default App;