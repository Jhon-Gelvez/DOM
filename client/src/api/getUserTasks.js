import { apiUrl } from "../config.js";

export const getUserTasks = async (userId) => {
    const response = await fetch(`${apiUrl}/${userId}?_embed=tasks`);

    if (!response.ok) {
        let errorText = "Error al obtener las tareas";

        if (response.status === 500) {
            errorText = "Error interno del servidor al obtener tareas";
        }

        const error = new Error(`${errorText} (Código: ${response.status})`);
        error.status = response.status;
        throw error;
    }

    const data = await response.json();
    return data.tasks || [];
};
