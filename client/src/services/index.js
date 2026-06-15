export { searchUser } from "./userService.js";
export { createTask, updateTask, deleteTask } from "./taskService.js";
export { filterTasksList } from "./filterService.js";
export { sortTasks } from "./taskOrderService.js";
export { addTaskToTable, clearTasks, showEmptyTasks } from "./uiService.js"; // <--- Añade esta línea
export * from "./config.js";