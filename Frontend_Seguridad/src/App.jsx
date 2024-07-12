import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// Importar los componentes específicos
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { token, role } = response.data;
      setToken(token);
      setRole(role);
    } catch (error) {
      setMessage('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      setMessage('Registro exitoso. Por favor, inicia sesión.');
      // Redirigir a la pantalla de login después del registro exitoso
      return <Navigate to="/login" />;
    } catch (error) {
      setMessage('Error al registrar usuario');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Formulario de contacto</h1>
        </header>
        <Routes>
          <Route
            path="/register"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={token ? (
              <Navigate to="/home" />
            ) : (
              <div>
                <p>Por favor, {message.includes('Registro') ? 'registra tu usuario y contraseña' : 'ingresa con tu usuario y contraseña'}.</p>
                <button onClick={() => <Navigate to="/login" />}>Iniciar Sesión</button>
              </div>
            )}
          />
          <Route path="/home" element={<Home role={role} />} />
        </Routes>
        <footer>
          <p>Desarrollado por Aneth Acosta, Sara Cedeño, Lesly Gamboa</p>
          <p className="anio">© 2024</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
