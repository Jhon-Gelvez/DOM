import { tasksTable } from "../services/config.js";

export const showEmptyTasks = () => {
    tasksTable.innerHTML = `
        <div class="messages-empty">
            <div class="messages-empty__icon">📋</div>
            <p class="messages-empty__text">El usuario no tiene tareas</p>
            <p class="messages-empty__subtext">Registre una nueva tarea.</p>
        </div>
    `;
};
