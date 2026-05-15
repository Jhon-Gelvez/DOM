import { tasksTable, taskCount } from "./selectors.js";
import { getCurrentUser, incrementTotalTasks, getTotalTasks } from "./globals.js";

// ============================================
// AGREGAR TAREA A LA TABLA
// ============================================

export const addTaskToTable = (task) => {
    const emptyMessage = document.querySelector(".messages-empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const taskCard = document.createElement("div");
    taskCard.classList.add("message-card");

    let statusText = "";
    let statusColor = "";

    switch (task.status) {
        case "pendiente":
            statusText = "Pendiente";
            statusColor = "#f59e0b";
            break;

        case "en-progreso":
            statusText = "En Progreso";
            statusColor = "#3b82f6";
            break;

        case "completada":
            statusText = "Completada";
            statusColor = "#10b981";
            break;

        default:
            statusText = "Sin estado";
            statusColor = "#6b7280";
            break;
    }

    const currentUser = getCurrentUser();

    taskCard.innerHTML = `
    
        <div class="message-card__header">

            <div>
                <div class="message-card__username">
                    ${task.title}
                </div>

                <div class="message-card__timestamp">
                    Usuario: ${currentUser.name}
                </div>
            </div>

            <span 
                style="
                    background:${statusColor};
                    color:white;
                    padding:6px 12px;
                    border-radius:20px;
                    font-size:12px;
                    font-weight:bold;
                "
            >
                ${statusText}
            </span>

        </div>

        <div class="message-card__content">
            ${task.description || "Sin descripción"}
        </div>
    `;

    tasksTable.prepend(taskCard);

    incrementTotalTasks();
    taskCount.textContent = `${getTotalTasks()} Tareas`;
};
