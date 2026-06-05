import { apiTasks } from "./config.js";
import { handleApiError } from "./utils/handleApiError.js";

export const updateTask = async (taskId, taskData) => {
    const response = await fetch(`${apiTasks}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
    });

    return handleApiError(response, "Error al actualizar la tarea", {
        404: "Tarea no encontrada",
        500: "Error interno del servidor",
    });
};
