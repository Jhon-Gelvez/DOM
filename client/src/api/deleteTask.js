import { apiTasks } from "../config.js";
import { handleApiError } from "../utils/handleApiError.js";

export const deleteTask = async (taskId) => {
    const response = await fetch(`${apiTasks}/${taskId}`, {
        method: "DELETE",
    });

    return handleApiError(response, "Error al eliminar la tarea", {
        404: "Tarea no encontrada",
        500: "Error interno del servidor",
    });
};
