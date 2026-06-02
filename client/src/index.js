// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./config.js";
export { toggleTaskForm } from "./ui/toggleTaskForm.js";
export { clearTasks } from "./ui/clearTasks.js";
export { showUserInfo } from "./ui/showUserInfo.js";
export { addTaskToTable } from "./ui/addTaskToTable.js";
export { showMessage, showErrorMessage } from "./notifications.js";
export { getUserByDocument } from "./api/getUser.js";
export { getUserTasks } from "./api/getUserTasks.js";
export { createTask } from "./createTask.js";
export { updateTask } from "./api/updateTask.js";
export { deleteTask } from "./api/deleteTask.js";
export { isValidInput } from "./validateInput.js";
export { handleApiError } from "./handleApiError.js";
