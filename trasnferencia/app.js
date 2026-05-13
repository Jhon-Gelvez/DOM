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
const taskCount = document.getElementById("task-count"); 

// ============================================
// VARIABLES GLOBALES
// ============================================

let currentUser = null;
let totalTasks = 0;

// ============================================
// HABILITAR / DESHABILITAR FORMULARIO
// ============================================

const toggleTaskForm = (disabled) => {
    const elements = taskForm.querySelectorAll(
        "input, textarea, select, button",
    );

    elements.forEach((element) => {
        element.disabled = disabled;
    });
};

// ============================================
// DESHABILITAR FORMULARIO AL INICIO
// ============================================

toggleTaskForm(true);

// ============================================
// MOSTRAR INFORMACIÓN DEL USUARIO
// ============================================

const showUserInfo = (user) => {
    userInfoDisplay.innerHTML = `
    
        <div class="message-card__header">
        
            <div class="message-card__user">
            
                <div class="message-card__avatar">
                    ${user.name.charAt(0)}
                </div>

                <div>

                    <div class="message-card__username">
                        ${user.name}
                    </div>

                    <div class="message-card__timestamp">
                        Usuario encontrado
                    </div>

                </div>

            </div>

        </div>

        <div class="message-card__content">

            <strong>Documento:</strong> ${user.id}<br>

            <strong>Nombre:</strong> ${user.name}<br>

            <strong>Email:</strong> ${user.email}

        </div>

    `;
}

// ============================================
// AGREGAR TAREA A LA TABLA
// ============================================

const addTaskToTable = (task) => {
    // ELIMINAR MENSAJE VACÍO

    const emptyMessage = document.querySelector(".messages-empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    // CREAR CONTENEDOR

    const taskCard = document.createElement("div");

    taskCard.classList.add("message-card");

    // ESTADO VISUAL

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

    // CONTENIDO

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

    // INSERTAR EN EL DOM

    tasksTable.prepend(taskCard);

    // ACTUALIZAR CONTADOR

    totalTasks++;

    taskCount.textContent = `${totalTasks} Tareas`;
};

// ============================================
// MENSAJES TEMPORALES
// ============================================

const showMessage = (message) => {
    const alertBox = document.createElement("div");

    alertBox.classList.add("message-card");

    alertBox.style.borderLeft = "4px solid #10b981";

    alertBox.innerHTML = `
        <div class="message-card__content">
            ✅ ${message}
        </div>
    `;

    document.body.appendChild(alertBox);

    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.width = "300px";
    alertBox.style.zIndex = "999";

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
};

// ==========================================
// MENSAJE ERROR
// ==========================================

function showErrorMessage(message) {
  const alertBox = document.createElement("div");

  alertBox.classList.add("message-card");

  alertBox.style.borderLeft = "4px solid #ef4444";

  alertBox.innerHTML = `
    <div class="message-card__content">
      X ${message}
    </div>
  `;

  document.body.appendChild(alertBox);

  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.width = "300px";
  alertBox.style.zIndex = "999";
  alertBox.style.background = "white";

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

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

        const tasksResponse = await fetch(
            `${apiUrl}/${currentUser.id}?_embed=tasks`,
        );

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

// ============================================
// EVENTO REGISTRAR TAREA
// ============================================

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // VALIDACIONES

    const title = taskTitle.value.trim();
    const description = taskDesc.value.trim();
    const status = taskStatus.value;

    if (title === "" || description === "" || status === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    // OBJETO DE LA TAREA

    const newTask = {
        userId: currentUser.id,
        title: title,
        description: description,
        status: status,
    };

    try {
        // ENVÍO AL SERVIDOR
        const response = await fetch(apiTasks, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });

        const taskSaved = await response.json();

        // MOSTRAR EN INTERFAZ

        addTaskToTable(taskSaved);

        // LIMPIAR FORMULARIO

        taskForm.reset();

        showMessage("Tarea registrada correctamente");
    } catch (error) {
        alert("Error al registrar tarea");

        console.error(error);
    }
});