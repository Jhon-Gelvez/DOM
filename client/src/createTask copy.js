import { apiTasks } from "./config.js";
import { handleApiError } from "./handleApiError.js";

export const createTask = async (taskData) => {
    const response = await fetch(apiTasks, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
    });

    return handleApiError(response, "Error al registrar la tarea", {
        400: "Datos de tarea inválidos",
        500: "Error interno del servidor",
    });
};
