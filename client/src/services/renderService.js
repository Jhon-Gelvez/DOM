import { clearTasks, showEmptyTasks, addTaskToTable } from "./index.js";
import { filterTasksList } from "./filterService.js";

export const renderFilteredTasks = (tasksToRender) => {
    clearTasks();
    const filteredTasks = filterTasksList(tasksToRender);
    
    if (!filteredTasks.length) {
        showEmptyTasks();
        return;
    }
    
    filteredTasks.forEach(addTaskToTable);
};