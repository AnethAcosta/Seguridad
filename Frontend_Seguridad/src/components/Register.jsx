import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', firstName: '', lastName: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Usuario registrado: ', response.data);
      setMessage('Usuario registrado exitosamente');
      // Aquí puedes manejar la redirección después del registro exitoso
    } catch (error) {
      console.error('Error al intentar registrar usuario: ', error);
      setMessage('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Apellido:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Usuario:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Registrarse</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
