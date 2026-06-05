// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./config.js";

export {
    toggleTaskForm,
    clearTasks,
    showUserInfo,
    addTaskToTable,
    showMessage,
    showErrorMessage,
} from "./ui/index.js";

export { getUserByDocument } from "./getUser.js";
export { getUserTasks } from "./getUserTasks.js";
export { createTask } from "./createTask.js";
export { updateTask } from "./updateTask.js";
export { deleteTask } from "./deleteTask.js";
export { setTextContent, setInnerHtml } from "./ui/index.js";
export * from "./utils/index.js";