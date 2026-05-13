// ============================================
// VARIABLES Y SELECTORES DEL DOM
// ============================================

// const apiUrl = "http://localhost:3044/users";
// const apiTasks = "http://10.5.225.175:3044/tasks";
const apiUrl = "http://localhost:3044/users";
const apiTasks = "http://localhost:3044/tasks";

const userDocInput = document.getElementById("user-doc");
const btnSearch = document.getElementById("btn-search");
const searchError = document.getElementById("search-error");

const userInfoDisplay = document.getElementById("user-info-display");

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const taskStatus = document.getElementById("task-status");

const tasksTable = document.getElementById("tasks-table");

// ============================================
// VARIABLES GLOBALES
// ============================================

let currentUser = null;
let totalTasks = 0;

// ============================================
// HABILITAR / DESHABILITAR FORMULARIO
// ============================================

const toggleTaskForm = (disabled) => {
    const elements = taskForm.querySelectorAll("input, textarea, select, button");

    elements.forEach((element) => {
        element.disabled = disabled;
    });
};

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
        currentUser = null;

        // ============================================
        // BUSCAR USUARIO
        // ============================================

        const response = await fetch(`${apiUrl}/${documentValue}`);

        // ============================================
        // USUARIO NO EXISTE
        // ============================================

        if (!response.ok) {
            toggleTaskForm(true);

            userInfoDisplay.innerHTML = `
            
                <div class="message-card__content">
                    ❌ Usuario no encontrado
                </div>

            `;

            return;
        }

        const userFound = await response.json();

        currentUser = userFound;

        // ============================================
        // MOSTRAR USUARIO
        // ============================================

        toggleTaskForm(false);

        // ============================================
        // TRAER TAREAS
        // ============================================

        const tasksResponse = await fetch(`${apiUrl}/${currentUser.id}?_embed=tasks`);

        const userTasks = await tasksResponse.json();

        // ============================================
        // SIN TAREAS
        // ============================================
        console.log(userTasks.tasks);

        if (!userTasks.tasks.length > 0) {
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

        // ============================================
        // MOSTRAR TAREAS
        // ============================================

        userTasks.tasks.forEach((task) => {
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
