import { apiUrl, apiTasks } from "../config.js";
import { request } from "./apiClient.js";

export const getUserTasks = async (userId) => {
    const data = await request(`${apiUrl}/${userId}?_embed=tasks`, "GET", null, {
        500: "Error interno del servidor al obtener tareas",
    });
    return data.tasks || [];
};

export const createTask = async (taskData) => {
    return request(apiTasks, "POST", taskData, {
        400: "Datos de tarea inválidos",
        500: "Error interno del servidor",
    });
};

export const updateTask = async (taskId, taskData) => {
    return request(`${apiTasks}/${taskId}`, "PATCH", taskData, {
        404: "Tarea no encontrada",
        500: "Error interno del servidor",
    });
};

export const deleteTask = async (taskId) => {
    return request(`${apiTasks}/${taskId}`, "DELETE", null, {
        404: "Tarea no encontrada",
        500: "Error interno del servidor",
    });
};