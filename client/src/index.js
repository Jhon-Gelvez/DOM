// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./config.js";
export { toggleTaskForm } from "./toggleTaskForm.js";
export { clearTasks } from "./clearTasks.js";
export { showUserInfo } from "./showUserInfo.js";
export { addTaskToTable } from "./addTaskToTable.js";
export { showMessage, showErrorMessage } from "./notifications.js";
export { getUserByDocument } from "./getUser.js";
export { getUserTasks } from "./getUserTasks.js";
export { createTask } from "./createTask.js";
export { updateTask } from "./updateTask.js";
export { deleteTask } from "./deleteTask.js";
export { isValidInput } from "./utils/validateInput.js";
export { handleApiError } from "./utils/handleApiError.js";
export { handleError } from "./utils/handleError.js";
export { setTextContent } from "./utils/setTextContent.js";
export { setInnerHtml } from "./utils/setInnerHtml.js";
export { getStatusLabel } from "./statusMapper.js";
