// ============================================
// IMPORTS
// ============================================

import {
    apiUrl,
    apiTasks,
    btnSearch,
    userDocInput,
    searchError,
    userInfoDisplay,
    taskForm,
    taskTitle,
    taskDesc,
    taskStatus,
    toggleTaskForm,
    clearTasks,
    tasksTable,
    showUserInfo,
    addTaskToTable,
    showMessage,
    showErrorMessage,
    getCurrentUser,
    setCurrentUser,
    getEditingTaskId,
    setEditingTaskId,
} from "./src/index.js";

// ============================================
// DESHABILITAR FORMULARIO AL INICIO
// ============================================

toggleTaskForm(true);

// ============================================
// EVENTO BUSCAR USUARIO
// ============================================

btnSearch.addEventListener("click", async () => {
    const documentValue = userDocInput.value.trim();

    searchError.textContent = "";

    if (documentValue === "") {
        searchError.textContent = "Debe ingresar un documento";
        showErrorMessage("Debe ingresar un documento");
        return;
    }

    try {
        clearTasks();
        setCurrentUser(null);
        userInfoDisplay.innerHTML = "";

        const response = await fetch(`${apiUrl}/${documentValue}`);

        if (!response.ok) {
            toggleTaskForm(true);

            let errorText = "Error al buscar usuario";
            if (response.status === 404) {
                errorText = "Usuario no encontrado";
            } else if (response.status === 500) {
                errorText = "Error interno del servidor";
            } else if (response.status === 400) {
                errorText = "Petición incorrecta";
            } else if (response.status === 403) {
                errorText = "Acceso denegado";
            } else if (response.status === 401) {
                errorText = "No autorizado";
            }

            const errorMsg = `${errorText} (Código: ${response.status})`;

            userInfoDisplay.innerHTML = `
                <div class="message-card__content">
                    ❌ ${errorMsg}
                </div>
            `;

            showErrorMessage(errorMsg);
            return;
        }

        const userFound = await response.json();
        setCurrentUser(userFound);

        showUserInfo(userFound);
        toggleTaskForm(false);
        showMessage("Usuario encontrado correctamente");

        const tasksResponse = await fetch(`${apiUrl}/${getCurrentUser().id}?_embed=tasks`);

        if (!tasksResponse.ok) {
            let errorText = "Error al obtener las tareas";
            if (tasksResponse.status === 500) {
                errorText = "Error interno del servidor al obtener tareas";
            }
            showErrorMessage(`${errorText} (Código: ${tasksResponse.status})`);
            return;
        }

        const userTasks = await tasksResponse.json();
        const tasks = userTasks.tasks || [];

        clearTasks();

        if (!tasks.length) {
            tasksTable.innerHTML = `
                <div class="messages-empty">
                    <div class="messages-empty__icon">
                        📋
                    </div>

                    <p class="messages-empty__text">
                        El usuario no tiene tareas
                    </p>

                    <p class="messages-empty__subtext">
                        Registre una nueva tarea.
                    </p>
                </div>
            `;
            return;
        }

        tasks.forEach((task) => {
            addTaskToTable(task);
        });
    } catch (error) {
        toggleTaskForm(true);

        const errorMsg = "Error de red: No se pudo establecer conexión con el servidor";

        userInfoDisplay.innerHTML = `
            <div class="message-card__content">
                ❌ ${errorMsg}
            </div>
        `;

        showErrorMessage(errorMsg);
        console.error(error);
    }
});

// ============================================
// EVENTO REGISTRAR TAREA
// ============================================

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDesc.value.trim();
    const status = taskStatus.value;
    const editingId = getEditingTaskId();

    if (title === "" || description === "" || status === "") {
        showErrorMessage("Todos los campos son obligatorios");
        return;
    }

    if (editingId) {
        try {
            const response = await fetch(`${apiTasks}/${editingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, status }),
            });

            if (!response.ok) {
                let errorText = "Error al actualizar la tarea";
                if (response.status === 404) {
                    errorText = "Tarea no encontrada";
                } else if (response.status === 500) {
                    errorText = "Error interno del servidor";
                }
                showErrorMessage(`${errorText} (Código: ${response.status})`);
                return;
            }

            const taskEdit = await response.json();

            const card = document.getElementById(taskEdit.id);
            if (card) {
                let statusText = "";
                switch (taskEdit.status) {
                    case "pendiente":
                        statusText = "Pendiente";
                        break;
                    case "en-progreso":
                        statusText = "En Progreso";
                        break;
                    case "completada":
                        statusText = "Completada";
                        break;
                    default:
                        statusText = "Sin estado";
                        break;
                }

                card.querySelector(".message-card__title").textContent = `${taskEdit.title}`;
                card.querySelector(".message-card__content").textContent = taskEdit.description || "Sin descripción";

                const badge = card.querySelector(".task-badge");
                badge.className = `task-badge task-badge--${taskEdit.status}`;
                badge.textContent = statusText;
            }

            setEditingTaskId(null);
            taskForm.reset();
            const submitBtn = taskForm.querySelector('button[type="submit"]');
            submitBtn.textContent = "Guardar Tarea";

            showMessage("Tarea actualizada correctamente");
        } catch (error) {
            showErrorMessage("Error de red: No se pudo establecer conexión con el servidor");
            console.error(error);
        }
    } else {
        const newTask = {
            userId: getCurrentUser().id,
            title,
            description,
            status,
        };

        try {
            const response = await fetch(apiTasks, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                let errorText = "Error al registrar la tarea";
                if (response.status === 400) {
                    errorText = "Datos de tarea inválidos";
                } else if (response.status === 500) {
                    errorText = "Error interno del servidor";
                }
                showErrorMessage(`${errorText} (Código: ${response.status})`);
                return;
            }

            const taskSaved = await response.json();

            addTaskToTable(taskSaved);
            taskForm.reset();
            showMessage("Tarea registrada correctamente");
        } catch (error) {
            showErrorMessage("Error de red: No se pudo establecer conexión con el servidor");
            console.error(error);
        }
    }
});

// ============================================
// EVENTO EDITAR TAREA
// ============================================

tasksTable.addEventListener("click", (event) => {
    const btnUpdate = event.target.closest(".btnUpdate");
    if (!btnUpdate) return;

    event.preventDefault();

    const taskId = btnUpdate.getAttribute("data-id");
    const currentCard = btnUpdate.closest(".message-card");
    if (!currentCard) return;

    const currentTitleText = currentCard.querySelector(".message-card__title").textContent.replace("Tarea: ", "").trim();
    const currentDescText = currentCard.querySelector(".message-card__content").textContent.trim();

    taskTitle.value = currentTitleText;
    taskDesc.value = currentDescText;
    taskStatus.value = "";

    setEditingTaskId(taskId);

    const submitBtn = taskForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "Actualizar Tarea";

    taskForm.scrollIntoView({ behavior: "smooth", block: "center" });
    taskTitle.focus();
});
