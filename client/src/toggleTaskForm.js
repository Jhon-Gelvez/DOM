import { taskForm } from "../config.js";

// ============================================
// HABILITAR / DESHABILITAR FORMULARIO
// ============================================

export const toggleTaskForm = (disabled) => {
    const elements = taskForm.querySelectorAll(
        "input, textarea, select, button",
    );

    elements.forEach((element) => {
        element.disabled = disabled;
    });
};
