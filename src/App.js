import React, { useState } from 'react';
import './App.css';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [input, setInput] = useState(''); // Almacena la expresión ingresada
  const [result, setResult] = useState('0'); // Almacena el resultado

  // Función para manejar los clics en los botones
  const handleClick = (value) => {
    if (value === 'C') {
      // Limpiar todo
      setInput('');
      setResult('0');
    } else if (value === '=') {
      // Calcular el resultado
      try {
        const evalResult = eval(input);
        setResult(evalResult.toString());
        setInput(evalResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else {
      // Concatenar valores
      setInput((prev) => prev + value);
    }
  };

  // Botones de la calculadora
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '=', '+'
  ];

  return (
    <div className="app">
      {!showCalculator ? (
        // Pantalla de Bienvenida
        <div className="welcome-container">
          <h1>Bienvenido a la calculadora</h1>
          <h2>La calculadora de nuestro grupo</h2>
          <button 
            className="start-button" 
            onClick={() => setShowCalculator(true)}
          >
            Inicie aquí
          </button>
        </div>
      ) : (
        // Calculadora Moderna
        <div className="calculator-container">
          <div className="calculator">
            <div className="display">
              <div className="input">{input || '0'}</div>
              <div className="result">{result}</div>
            </div>
            <div className="buttons">
              {buttons.map((btn, index) => (
                <button
                  key={index}
                  className={`button ${btn === '=' ? 'equals' : ''} ${btn === 'C' ? 'clear' : ''}`}
                  onClick={() => handleClick(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
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