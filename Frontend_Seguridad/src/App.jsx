import React, { useState } from 'react';
import './App.css';
import membrete from './assets/membrete-ds9.png'; // Asegúrate de importar la imagen

import Form from './components/Form';

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      throw new Error('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/register', formData);
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={membrete} alt="membrete" />
        <h1>Formulario de contacto</h1>
        {token ? (
          <p>Bienvenido al sistema.</p>
        ) : (
          <p>Por favor, {message.includes('Registro') ? 'registra tu usuario y contraseña' : 'ingresa con tu usuario y contraseña'}.</p>
        )}
      </header>
      {!token && message.includes('Registro') ? (
        <Form handleSubmit={handleRegister} buttonText="Registrarse" formType="register" />
      ) : (
        <Form handleSubmit={handleLogin} buttonText="Iniciar Sesión" formType="login" />
      )}
      <footer>
        <p>Desarrollado por Aneth Acosta, Sara Cedeño, Lesly Gamboa</p>
        <p className="anio">© 2024</p>
      </footer>
    </div>
  );
};

export default App;
