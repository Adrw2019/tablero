import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaEye } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import "./KanbanBoard.css";

const KanbanBoard = ({ token }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/tareas/";

  const fetchTareas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTareas(response.data);
    } catch (err) {
      setError("Error al obtener las tareas");
      console.error("Error fetching tareas:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTareas();
  }, [fetchTareas]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(
        `${API_URL}${taskId}/`,
        { estado: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTareas((prevTareas) =>
        prevTareas.map((task) =>
          task.id === taskId ? { ...task, estado: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Error al cambiar el estado de la tarea:", err);
      setError("Error al cambiar el estado de la tarea");
    }
  };

  const filtrarTareas = (tareas) => {
    if (filter === "all") return tareas;
    return tareas.filter((task) => {
      if (filter === "pending") return task.estado === 'P';
      if (filter === "in-progress") return task.estado === 'E';
      if (filter === "completed") return task.estado === 'C';
      return false;
    });
  };

  const ordenarTareas = (tareas) => {
    if (sort === "date") {
      return tareas.sort((a, b) => new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento));
    } else if (sort === "priority") {
      const priorityOrder = { B: 1, M: 2, A: 3 };
      return tareas.sort((a, b) => priorityOrder[a.prioridad] - priorityOrder[b.prioridad]);
    }
    return tareas;
  };

  const tareasFiltradas = ordenarTareas(filtrarTareas(tareas));

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row mt-4">
        {/* Columna Tareas Pendientes */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Tareas Pendientes</h5>
              {tareasFiltradas
                .filter((task) => task.estado === "P")
                .map((task) => (
                  <div key={task.id} className="task-card p-2 my-2">
                    <h6>{task.name}</h6>
                    <div className="d-flex justify-content-between">
                      <button onClick={() => { setSelectedTask(task); setShowModal(true); }}><FaEye /></button>
                      <button onClick={() => changeTaskStatus(task.id, "E")} className="btn btn-warning">Iniciar</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Columna Tareas en Progreso */}
        <div className="col-md-4">
          <div className="card shadow-sm progreso"> {/* Añadir la clase progreso */}
            <div className="card-body">
              <h5 className="card-title">Tareas en Progreso</h5>
              {tareasFiltradas
                .filter((task) => task.estado === "E")
                .map((task) => (
                  <div key={task.id} className="task-card p-2 my-2">
                    <h6>{task.name}</h6>
                    <div className="d-flex justify-content-between">
                      <button onClick={() => { setSelectedTask(task); setShowModal(true); }}><FaEye /></button>
                      <button onClick={() => changeTaskStatus(task.id, "C")} className="btn btn-success">Completar</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Columna Tareas Completadas */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Tareas Completadas</h5>
              {tareasFiltradas
                .filter((task) => task.estado === "C")
                .map((task) => (
                  <div key={task.id} className="task-card p-2 my-2">
                    <h6>{task.name}</h6>
                    <div className="d-flex justify-content-between">
                      <button onClick={() => { setSelectedTask(task); setShowModal(true); }}><FaEye /></button>
                      <button onClick={() => changeTaskStatus(task.id, "E")} className="btn btn-warning">Reiniciar</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para ver detalles de la tarea */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <h5>{selectedTask.name}</h5>
              <p><strong>Descripción:</strong> {selectedTask.description}</p>
              <p><strong>Fecha de vencimiento:</strong> {selectedTask.fecha_vencimiento}</p>
              <p><strong>Estado:</strong> {selectedTask.estado}</p>
              <p><strong>Prioridad:</strong> {selectedTask.prioridad}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={() => { /* Maneja la edición aquí */ }}>Editar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default KanbanBoard;


