// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./services/config.js";
export { toggleTaskForm } from "./ui/toggleTaskForm.js";
export { clearTasks } from "./ui/clearTasks.js";
export { showUserInfo } from "./ui/showUserInfo.js";
export { addTaskToTable } from "./ui/addTaskToTable.js";
export { showMessage, showErrorMessage } from "./ui/notifications.js";
export { getUserByDocument } from "./api/getUser.js";
export { getUserTasks } from "./api/getUserTasks.js";
export { createTask } from "./api/createTask.js";
export { updateTask } from "./api/updateTask.js";
export { deleteTask } from "./api/deleteTask.js";
export { isValidInput } from "./utils/validateInput.js";
export { handleApiError } from "./utils/handleApiError.js";
