// ============================================
// IMPORTS
// ============================================

import { apiUrl, apiTasks, btnSearch, userDocInput, searchError, userInfoDisplay, taskForm, taskTitle, taskDesc, taskStatus, toggleTaskForm, clearTasks, tasksTable, showUserInfo, addTaskToTable, showMessage, showErrorMessage, getCurrentUser, setCurrentUser,  } from "./src/index.js";

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

            userInfoDisplay.innerHTML = `
                <div class="message-card__content">
                    ❌ Usuario no encontrado
                </div>
            `;

            showErrorMessage("Usuario no encontrado");
            return;
        }

        const userFound = await response.json();
        setCurrentUser(userFound);

        showUserInfo(userFound);
        toggleTaskForm(false);
        showMessage("Usuario encontrado correctamente");

        const tasksResponse = await fetch(`${apiUrl}/${getCurrentUser().id}?_embed=tasks`);

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

        userInfoDisplay.innerHTML = `
            <div class="message-card__content">
                ❌ Error al consultar el servidor
            </div>
        `;

        showErrorMessage("Error al consultar el servidor");
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

    if (title === "" || description === "" || status === "") {
        showErrorMessage("Todos los campos son obligatorios");
        return;
    }

    const newTask = {
        userId: getCurrentUser().id,
        title: title,
        description: description,
        status: status,
    };

    try {
        const response = await fetch(apiTasks, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });

        const taskSaved = await response.json();

        addTaskToTable(taskSaved);
        taskForm.reset();
        showMessage("Tarea registrada correctamente");
    } catch (error) {
        showErrorMessage("Error al registrar tarea");
        console.error(error);
    }
});
