import { filterStatus, filterTitle } from "../index.js";

// ============================================
//  LÓGICA DE FILTRADO EN TIEMPO REAL 
// ============================================
export const obtenerTareasFiltradas = (misTareasLocales) => {
    const estadoSeleccionado = filterStatus.value;
    const textoBusqueda = filterTitle.value.toLowerCase().trim();

    // Retorna únicamente el arreglo ya filtrado
    return misTareasLocales.filter((tarea) => {
        const coincideEstado = estadoSeleccionado === "todos" || tarea.status === estadoSeleccionado;
        const coincideTitulo = tarea.title.toLowerCase().includes(textoBusqueda);
        return coincideEstado && coincideTitulo;
    });
};