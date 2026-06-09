// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./services/config.js";

export {
    toggleTaskForm,
    clearTasks,
    showUserInfo,
    addTaskToTable,
    showMessage,
    showErrorMessage,
    setTextContent,
    setInnerHtml,
    showEmptyTasks,
} from "./ui/index.js";

export { searchUser, createTask, updateTask, deleteTask, obtenerTareasFiltradas } from "./services/index.js";
export * from "./utils/index.js";
