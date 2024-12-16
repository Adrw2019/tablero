import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importa el archivo CSS

const Login = ({ setToken }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setError] = useState('');
  const navegar = useNavigate();
  const API_URL = 'http://127.0.0.1:8000/authentification/token/';

  const validarDatos = async () => {
    if (!correo || !contrasena) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const respuesta = await axios.post(API_URL, {
        correo,
        password: contrasena
      });
      localStorage.setItem('access_token', respuesta.data.access);
      setToken(respuesta.data.access);
      navegar('/dashboard');
    } catch (error) {
      console.error('Error en la solicitud:', error.response || error.message);
      setError('Credenciales incorrectas, intente de nuevo');
    }
  };

  const manejarRecuperacionContrasena = () => {
    navegar('/recuperar-contraseña');
  };

  const manejarRegistro = () => {
    navegar('/register');
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 login-card" style={{ width: '22rem' }}>
        {/* Logo */}
        <div className="text-center mb-3">
          <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Logo" className="logo-img" />
        </div>

        <h1 className="text-center">Tarea</h1>
        <h3 className="text-center">Iniciar sesión</h3>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); validarDatos(); }}>
          <div className="form-group">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {errores && <p className="text-danger">{errores}</p>}

          {/* Botón de Iniciar sesión centrado y en rojo */}
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-danger btn-block">
              Iniciar sesión
            </button>
          </div>
        </form>

        {/* Botón de "Regístrate aquí" también en rojo */}
        <div className="d-grid mt-3">
          <button onClick={manejarRegistro} className="btn btn-danger btn-block">
            ¿No tienes cuenta? <strong>Regístrate aquí</strong>
          </button>
        </div>

        {/* Botón de "Olvidaste tu contraseña?" también en rojo */}
        <div className="d-grid mt-2">
          <button onClick={manejarRecuperacionContrasena} className="btn btn-danger btn-block">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;


