// src/Component/Tarea/TaskFilters.js
import React from "react";

const TaskFilters = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="task-filters">
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completadas</option>
        <option value="archived">Archivadas</option>
      </select>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="date">Por Fecha</option>
        <option value="priority">Por Prioridad</option>
      </select>
    </div>
  );
};

export default TaskFilters;
