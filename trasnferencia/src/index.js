// ============================================
// BARREL FILE - EXPORTA TODOS LOS MÓDULOS
// ============================================

export * from "./selectors.js";
export * from "./constants.js";
export { getCurrentUser, setCurrentUser, getTotalTasks, setTotalTasks, incrementTotalTasks, resetTasks } from "./globals.js";
export { toggleTaskForm } from "./toggleTaskForm.js";
export { clearTasks } from "./clearTasks.js";
export { showUserInfo } from "./showUserInfo.js";
export { addTaskToTable } from "./addTaskToTable.js";
export { showMessage, showErrorMessage } from "./notifications.js";
