import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Asegúrate de tener el archivo CSS para los estilos personalizados
import MensajeError from './MensajeError'; // Asegúrate de que la ruta sea correcta

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errores, setErrores] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevenir recarga de la página
        if (!nombre || !apellido || !username || !correo || !contrasena) {
            setErrores('Por favor, complete todos los campos.');
            setMensajeExito('');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/authentification/register/', {
                nombre,
                apellido,
                username,
                correo,
                password: contrasena,
            });
            setMensajeExito('Registro exitoso. Puedes iniciar sesión ahora.');
            setErrores('');
            setNombre('');
            setApellido('');
            setUsername('');
            setCorreo('');
            setContrasena('');
        } catch (error) {
            console.error('Error en el registro:', error.response || error.message);
            setErrores('Error en el registro, intente de nuevo.');
            setMensajeExito('');
        }
    };

    return (
        <div className="container form-container">
            <div className="form-box">
                <h2 className="form-title">Registro</h2>
                <h4 className="text-center">Crear una cuenta</h4>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Escriba su nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            placeholder="Escriba su apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre de usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Escriba su nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            placeholder="Escriba su correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            placeholder="Escriba su contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-red btn-block w-100">Registrar</button>
                </form>
                {errores && <MensajeError message={errores} />}
                {mensajeExito && <div className="alert alert-success mt-3">{mensajeExito}</div>}
            </div>
        </div>
    );
};

export default Register;


