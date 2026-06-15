// src/api/usuarioApi.js
import { apiUrl } from "../config.js"; // Corregido: sube un nivel y encuentra config.js
import { request } from "./apiClient.js";

// Buscar usuario por número de documento
export const getUserByDocument = async (documentValue) => {
    return request(`${apiUrl}/${documentValue}`, "GET", null, {
        400: "Petición incorrecta",
        401: "No autorizado",
        403: "Acceso denegado",
        404: "Recurso no encontrado",
        500: "Error interno del servidor",
    });
};