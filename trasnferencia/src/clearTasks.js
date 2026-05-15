import { tasksTable, taskCount } from "./selectors.js";
import { resetTasks } from "./globals.js";

// ============================================
// LIMPIAR TABLA
// ============================================

export const clearTasks = () => {
    tasksTable.innerHTML = "";
    resetTasks();
    taskCount.textContent = "0 Tareas";
};
