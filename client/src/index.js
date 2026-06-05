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
    setTextContent,
    setInnerHtml,
} from "./ui/index.js";

export { getUserByDocument } from "./api/getUser.js";
export { getUserTasks } from "./api/getUserTasks.js";
export { createTask } from "./api/createTask.js";
export { updateTask } from "./api/updateTask.js";
export { deleteTask } from "./api/deleteTask.js";
export * from "./utils/index.js";
