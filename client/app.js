import {
    btnSearch,
    userDocInput,
    searchError,
    userInfoDisplay,
    taskForm,
    taskTitle,
    titleError,
    taskDesc,
    descError,
    taskStatus,
    statusError,
    tasksTable,
    getCurrentUser,
    setCurrentUser,
    getEditingTaskId,
    setEditingTaskId,
    toggleTaskForm,
    clearTasks,
    showUserInfo,
    addTaskToTable,
    showMessage,
    showErrorMessage,
    getUserByDocument,
    getUserTasks,
    createTask,
    updateTask,
    deleteTask,
    isValidInput,
} from "./src/index.js";

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

        const userFound = await getUserByDocument(documentValue);
        setCurrentUser(userFound);

        showUserInfo(userFound);
        toggleTaskForm(false);
        showMessage("Usuario encontrado correctamente");

        let userId = getCurrentUser().id

        const tasks = await getUserTasks(userId);
        clearTasks();

        if (!tasks.length) {
            tasksTable.innerHTML = `
                <div class="messages-empty">
                    <div class="messages-empty__icon">📋</div>
                    <p class="messages-empty__text">El usuario no tiene tareas</p>
                    <p class="messages-empty__subtext">Registre una nueva tarea.</p>
                </div>
            `;
            return;
        }

        tasks.forEach(addTaskToTable);
    } catch (error) {
        toggleTaskForm(true);
        userInfoDisplay.innerHTML = `
            <div class="message-card__content">❌ ${"Error en la petición"}</div>
        `;
        showErrorMessage(error.message);
        console.error(error);
    }
});

// ============================================
// EVENTO REGISTRAR / ACTUALIZAR TAREA
// ============================================

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDesc.value.trim();
    const status = taskStatus.value;
    const editingId = getEditingTaskId();

    if (!isValidInput(title) || !isValidInput(description) || !isValidInput(status)) {
        showErrorMessage("Todos los campos son obligatorios");
        return;
    }

    try {
        if (editingId) {
            const taskEdit = await updateTask(editingId, { title, description, status });

            const card = document.getElementById(taskEdit.id);
            if (card) {
                const statusMap = {
                    "pendiente": "Pendiente",
                    "en-progreso": "En Progreso",
                    "completada": "Completada",
                };
                const statusText = statusMap[taskEdit.status];

                card.querySelector(".message-card__title").textContent = taskEdit.title;
                card.querySelector(".message-card__content").textContent = taskEdit.description;

                const badge = card.querySelector(".task-badge");
                badge.className = `task-badge task-badge--${taskEdit.status}`;
                badge.textContent = statusText;
            }

            setEditingTaskId(null);
            taskForm.reset();
            taskForm.querySelector('button[type="submit"]').textContent = "Guardar Tarea";
            showMessage("Tarea actualizada correctamente");
        } else {
            const taskSaved = await createTask({
                userId: getCurrentUser().id,
                title,
                description,
                status,
            });

            addTaskToTable(taskSaved);
            taskForm.reset();
            showMessage("Tarea registrada correctamente");
        }
    } catch (error) {
        showErrorMessage(error.message);
        console.error(error);
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

// ============================================
// EVENTO ELIMINAR TAREA
// ============================================

tasksTable.addEventListener("click", async (event) => {
    const btnDelete = event.target.closest(".btnDelete");
    if (!btnDelete) return;

    event.preventDefault();
    const taskId = btnDelete.getAttribute("data-id");
    const currentCard = btnDelete.closest(".message-card");

    try {
        await deleteTask(taskId);
        currentCard.remove();
        showMessage("Tarea eliminada correctamente");
    } catch (error) {
        showErrorMessage(error.message);
        console.error(error);
    }
});
