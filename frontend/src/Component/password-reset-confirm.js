import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    try {
      console.log(uidb64, token);
      const response = await axios.post(`http://127.0.0.1:8000/authentification/password-reset-confirm/${uidb64}/${token}/`, {
        new_password: newPassword,
        confirm_password: confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response);
      setMessage('Contraseña restablecida con éxito.' + response.data);
      //navigate('/password-reset-complete');
    } catch (error) {
      console.log(error);
      setMessage('El enlace de restablecimiento es inválido o ha expirado.');
    }
  };

  return (
    <div className="password-reset-container">
        <h2 className="password-reset-title">Restablecer Contraseña</h2>
        <form className="password-reset-form" onSubmit={handleSubmit}>
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
                type="password"
                id="newPassword"
                placeholder="Nueva Contraseña"
                className="password-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmar Contraseña"
                className="password-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit" className="submit-button">Restablecer Contraseña</button>
        </form>
        {message && <div className="message">{message}</div>}
    </div>
);
};

export default PasswordResetConfirm;
