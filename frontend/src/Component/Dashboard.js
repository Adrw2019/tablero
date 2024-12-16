import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import KanbanBoard from './KanbanBoard';
import Menu from './Menu';

const Dashboard = ({ token }) => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const API_URL = 'http://127.0.0.1:8000/authentification/current-user/';

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                navigate('/login'); // Redirige al login si hay un error
            }
        };

        if (token) {
            fetchUserInfo();
        } else {
            navigate('/login'); // Redirige al login si no hay token
        }
    }, [token, navigate]); // Agregar navigate como dependencia

    if (!userInfo) {
        return <div>Cargando información del usuario...</div>; // Muestra un indicador de carga
    }

    return (
        <div className="bg-white text-dark min-vh-100">
            <Menu userInfo={userInfo} />
            <div className="container mt-4">
                <h2>Bienvenido {userInfo.username}</h2> {/* Mostrar nombre de usuario */}
                <KanbanBoard token={token} />
            </div>
        </div>
    );
};

export default Dashboard;
