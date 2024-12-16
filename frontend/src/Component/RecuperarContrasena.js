import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecuperarContrasena.css'; // Archivo CSS personalizado

const RecuperarContrasena = () => {
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState('');

    const manejarRecuperacion = async (event) => {
        event.preventDefault(); // Previene la recarga de la página
        try {
            // Asegúrate de que el backend espera "email" en lugar de "correo"
            const respuesta = await axios.post('http://127.0.0.1:8000/authentification/password-reset/', { email: correo });
            setMensaje('Se ha enviado un enlace de recuperación a tu correo.');
            setErrores('');
        } catch (error) {
            console.error('Error en la solicitud:', error.response || error.message);
            setErrores('Error al enviar el enlace de recuperación, intenta de nuevo.');
            setMensaje('');
        }
    };

    return (
        <div className="container form-container">
            <div className="form-box">
                <h2 className="form-title">Recuperación de Contraseña</h2>
                <form onSubmit={manejarRecuperacion}>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="Escriba su correo"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-red w-100">
                        Enviar enlace de recuperación
                    </button>
                </form>

                {/* Muestra el mensaje de éxito o error */}
                {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
                {errores && <div className="alert alert-danger mt-3">{errores}</div>}
            </div>
        </div>
    );
};

export default RecuperarContrasena;




