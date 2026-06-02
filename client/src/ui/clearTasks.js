import { tasksTable, taskCount, resetTasks } from "../config.js";

// ============================================
// LIMPIAR TABLA
// ============================================

export const clearTasks = () => {
    tasksTable.innerHTML = "";
    resetTasks();
    taskCount.textContent = "0 Tareas";
};
