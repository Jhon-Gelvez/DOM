// ============================================
// CONSTANTES DE API
// ============================================

// export const apiUrl = "http://10.5.225.105:3044/users";
// export const apiTasks = "http://10.5.225.105:3044/tasks";
export const apiUrl = "http://10.5.225.219:3044/users";
export const apiTasks = "http://10.5.225.219:3044/tasks";

// ============================================
// VARIABLES GLOBALES
// ============================================

let currentUser = null;
let totalTasks = 0;

export const getCurrentUser = () => currentUser;
export const setCurrentUser = (user) => {
    currentUser = user;
};

export const getTotalTasks = () => totalTasks;
export const setTotalTasks = (count) => {
    totalTasks = count;
};

export const incrementTotalTasks = () => {
    totalTasks++;
};

export const resetTasks = () => {
    totalTasks = 0;
};

let editingTaskId = null;
export const getEditingTaskId = () => editingTaskId;
export const setEditingTaskId = (id) => {
    editingTaskId = id;
};


// ============================================
// SELECTORES DEL DOM
// ============================================

export const userDocInput = document.getElementById("user-doc");
export const btnSearch = document.getElementById("btn-search");
export const searchError = document.getElementById("search-error");
export const userInfoDisplay = document.getElementById("user-info-display");
export const taskForm = document.getElementById("task-form");
export const taskTitle = document.getElementById("task-title");
export const taskDesc = document.getElementById("task-desc");
export const taskStatus = document.getElementById("task-status");
export const tasksTable = document.getElementById("tasks-table");
export const taskCount = document.getElementById("task-count");
