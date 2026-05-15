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
