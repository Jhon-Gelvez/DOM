// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./config.js";
// Las exportaciones de UI
export {
    toggleTaskForm,
    clearTasks,
    showUserInfo,
    addTaskToTable,
    showMessage,
    showErrorMessage,
} from "./ui/index.js";

// SE AGREGA /api/ PORQUE TUS ARCHIVOS AHORA ESTÁN DENTRO DE ESA CARPETA
export { getUserByDocument } from "./api/getUser.js";
export { getUserTasks } from "./api/getUserTasks.js";
export { createTask } from "./api/createTask.js";
export { updateTask } from "./api/updateTask.js";
export { deleteTask } from "./api/deleteTask.js";
export { handleApiError } from "./api/handleApiError.js";

export { isValidInput } from "./validateInput.js";
export { setTextContent } from "./setTextContent.js";