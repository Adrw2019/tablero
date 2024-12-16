import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link y useNavigate

const Menu = () => {
  const [showTaskList, setShowTaskList] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const taskListRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook para redireccionar

  const toggleTaskList = () => {
    setShowTaskList(prev => !prev);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(prev => !prev);
  };

  const handleLogout = () => {
    // Elimina el token o cualquier información de sesión
    localStorage.removeItem('token'); // O sessionStorage.removeItem('token');
    
    // Redirige al usuario a la página de inicio o de login
    navigate('/login'); // Cambia '/login' por la ruta que desees
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Mi Aplicación</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown" ref={taskListRef}>
              <span className="nav-link dropdown-toggle" onClick={toggleTaskList} style={{ cursor: "pointer" }}>
                Gestión Tarea
              </span>
              {showTaskList && (
                <ul className="dropdown-menu show">
                  <li><Link className="dropdown-item" to="/etiqueta">Etiqueta</Link></li>
                  <li><Link className="dropdown-item" to="/tarea">Tarea</Link></li>
                </ul>
              )}
            </li>
            <li className="nav-item dropdown" ref={userDropdownRef}>
              <span className="nav-link dropdown-toggle" onClick={toggleUserDropdown} style={{ cursor: "pointer" }}>
                Usuario
              </span>
              {showUserDropdown && (
                <ul className="dropdown-menu dropdown-menu-right show" style={{ marginTop: '40px' }}>
                  <li><Link className="dropdown-item" to="/userprofile">Datos de Usuario</Link></li>
                  <li><Link className="dropdown-item" to="/changepassword">Cambiar Contraseña</Link></li>
    
                </ul>
              )}
            </li>
            <li className="nav-item">
            <a className="navbar-brand" href="/">Cerrar Sesión</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
