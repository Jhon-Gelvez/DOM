import { apiUrl } from "../config.js";

export const getUserByDocument = async (documentValue) => {
    const response = await fetch(`${apiUrl}/${documentValue}`);

    if (!response.ok) {
        let errorText = "Error al buscar usuario";

        switch (response.status) {
            case 404: errorText = "Recurso no encontrado"; break;
            case 500: errorText = "Error interno del servidor"; break;
            case 400: errorText = "Petición incorrecta"; break;
            case 403: errorText = "Acceso denegado"; break;
            case 401: errorText = "No autorizado"; break;
        }

        const error = new Error(`${errorText} (Código: ${response.status})`);
        error.status = response.status;
        throw error;
    }

    return await response.json();
};
