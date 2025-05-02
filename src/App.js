import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const [history, setHistory] = useState([]);
  

  // Actualizar gráfica cuando cambia el historial
  useEffect(() => {
    if (showGraph && history.length > 0) {
      updateGraph();
    }
  }, [history, showGraph]);

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('0');
    } else if (value === '=') {
      try {
        const evalResult = eval(input);
        const newResult = parseFloat(evalResult.toFixed(4)).toString();
        setResult(newResult);
        setInput(newResult);
        setHistory([...history, { input, result: newResult }]);
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput(prev => prev + value);
    }
  };

  const updateGraph = () => {
    const lastFive = history.slice(-5); // Mostrar últimos 5 cálculos
    return {
      labels: lastFive.map((_, index) => `Op ${index + 1}`),
      datasets: [
        {
          label: 'Resultados',
          data: lastFive.map(item => parseFloat(item.result)),
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          tension: 0.1
        }
      ]
    };
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '=', '+'
  ];

  return (
    <div className="app">
      {!showCalculator ? (
        <div className="welcome-container">
          <h1>Bienvenido a la calculadora</h1>
          <h2>La calculadora de nuestro grupo</h2>
          <div className="button-group">
            <button className="start-button" onClick={() => setShowCalculator(true)}>
              Modo Calculadora
            </button>
            <button className="graph-button" onClick={() => {
              setShowCalculator(true);
              setShowGraph(true);
            }}>
              Modo Gráfico
            </button>
          </div>
        </div>
      ) : (
        <div className="main-content">
          {/* Calculadora (siempre visible) */}
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
            <button className="back-button" onClick={() => {
              setShowCalculator(false);
              setShowGraph(false);
            }}>
              Volver
            </button>
          </div>

          {/* Gráfica (solo en modo gráfico) */}
          {showGraph && (
            <div className="graph-container">
              <h2>Historial de Operaciones</h2>
              <div className="chart">
                <Line 
                  data={updateGraph()} 
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: false
                      }
                    }
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;