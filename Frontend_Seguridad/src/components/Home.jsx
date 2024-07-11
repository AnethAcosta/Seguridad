import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import axios from 'axios';

const Home = () => {
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios: ', error);
        setMessage('Error al obtener usuarios');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      {message && <p>{message}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </div>
  );
};

export default Home;
