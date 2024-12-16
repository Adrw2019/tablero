import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './TareaForm.css'; // Asegúrate de tener el archivo CSS en la misma carpeta

const TareaForm = ({ onCreate, onUpdate, tareaExistente, token }) => {
    const [tarea, setTarea] = useState({
        name: '',
        description: '',
        fecha_vencimiento: '',
        estado: 'P',
        prioridad: 'M',
        etiquetas_ids: []
    });

    const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);
    const [tareas, setTareas] = useState([]); // Estado para guardar las tareas
    const [error, setError] = useState(null); // Estado para manejar errores

    const fetchEtiquetas = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/etiquetas/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const etiquetasMapeadas = response.data.map(etiqueta => ({
                value: etiqueta.id,
                label: etiqueta.name
            }));
            setEtiquetasDisponibles(etiquetasMapeadas);
        } catch (err) {
            console.error('Error fetching etiquetas:', err);
        }
    }, [token]);

    const fetchTareas = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tareas/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTareas(response.data); // Guardar tareas en el estado
        } catch (err) {
            setError('Error al obtener las tareas.'); // Manejar el error
            console.error('Error fetching tareas:', err);
        }
    }, [token]);

    useEffect(() => {
        fetchEtiquetas();
        fetchTareas(); // Llama a la función para obtener tareas
    }, [fetchEtiquetas, fetchTareas]);

    useEffect(() => {
        if (tareaExistente) {
            const etiquetasMapeadas = tareaExistente.etiquetas.map(etiqueta => ({
                value: etiqueta.id,
                label: etiqueta.name
            }));
            setTarea({ ...tareaExistente, etiquetas_ids: etiquetasMapeadas });
        }
    }, [tareaExistente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarea({ ...tarea, [name]: value });
    };

    const handleEtiquetasChange = (selectedOptions) => {
        setTarea({ ...tarea, etiquetas_ids: selectedOptions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const etiquetasId = tarea.etiquetas_ids.map(etiqueta => etiqueta.value);
        const tareaConEtiquetas = { ...tarea, etiquetas_ids: etiquetasId };
        if (tareaExistente) {
            onUpdate(tarea.id, tareaConEtiquetas);
        } else {
            onCreate(tareaConEtiquetas);
        }
        setTarea({
            name: '',
            description: '',
            fecha_vencimiento: '',
            estado: 'P',
            prioridad: 'M',
            etiquetas_ids: []
        });
    };

    return (
        <form onSubmit={handleSubmit} className="container-fluid">
            <h5>{tareaExistente ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h5>
            {error && <div className="alert alert-danger">{error}</div>} {/* Muestra el error si existe */}
            <div className="row">
                <div className="col-12 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Nombre de la tarea"
                        value={tarea.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 mb-2">
                    <textarea
                        className="form-control"
                        name="description"
                        placeholder="Descripción de la tarea"
                        value={tarea.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <label>Fecha de Vencimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        name="fecha_vencimiento"
                        value={tarea.fecha_vencimiento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <label>Estado</label>
                    <select
                        className="form-select"
                        name="estado"
                        value={tarea.estado}
                        onChange={handleChange}
                        required
                    >
                        <option value="P">Pendiente</option>
                        <option value="E">En progreso</option>
                        <option value="C">Completado</option>
                    </select>
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <label>Prioridad</label>
                    <select
                        className="form-select"
                        name="prioridad"
                        value={tarea.prioridad}
                        onChange={handleChange}
                        required
                    >
                        <option value="B">Baja</option>
                        <option value="M">Media</option>
                        <option value="A">Alta</option>
                    </select>
                </div>
                <div className="col-12 mb-2">
                    <label>Etiquetas</label>
                    <Select
                        isMulti
                        options={etiquetasDisponibles}
                        value={tarea.etiquetas_ids}
                        onChange={handleEtiquetasChange}
                        placeholder="Seleccionar etiquetas"
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                        {tareaExistente ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TareaForm;



