import { apiTasks } from "../config.js";

export const updateTask = async (taskId, taskData) => {
    const response = await fetch(`${apiTasks}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        let errorText = "Error al actualizar la tarea";

        switch (response.status) {
            case 404: errorText = "Tarea no encontrada"; break;
            case 500: errorText = "Error interno del servidor"; break;
        }

        const error = new Error(`${errorText} (Código: ${response.status})`);
        error.status = response.status;
        throw error;
    }

    return await response.json();
};
