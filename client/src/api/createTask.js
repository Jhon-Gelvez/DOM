import { apiTasks } from "../config.js";

export const createTask = async (taskData) => {
    const response = await fetch(apiTasks, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        let errorText = "Error al registrar la tarea";

        switch (response.status) {
            case 400: errorText = "Datos de tarea inválidos"; break;
            case 500: errorText = "Error interno del servidor"; break;
        }

        const error = new Error(`${errorText} (Código: ${response.status})`);
        error.status = response.status;
        throw error;
    }

    return await response.json();
};
