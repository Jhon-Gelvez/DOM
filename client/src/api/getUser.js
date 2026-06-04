import { apiTasks } from "../config.js";
import { handleApiError } from "./handleApiError.js";

export const getUserByDocument = async (documentValue) => {
  const response = await fetch(`${apiUrl}/${documentValue}`);

  return handleApiError(response, "Error al buscar usuario", {
    400: "Petición incorrecta",
    401: "No autorizado",
    403: "Acceso denegado",
    404: "Recurso no encontrado",
    500: "Error interno del servidor",
  });
};
