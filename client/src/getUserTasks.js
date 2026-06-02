import { apiUrl } from "./config.js";
import { handleApiError } from "./utils/handleApiError.js";

export const getUserTasks = async (userId) => {
    const response = await fetch(`${apiUrl}/${userId}?_embed=tasks`);

    const data = await handleApiError(response, "Error al obtener las tareas", {
        500: "Error interno del servidor al obtener tareas",
    });

    return data.tasks || [];
};
