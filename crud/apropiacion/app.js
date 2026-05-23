const textTask = document.getElementById("todoInput");
const listTasks = document.getElementById("todoList");
const getTasksBtn = document.getElementById("getTasksBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const currentUser = null;
let editingId = null;

// const URL = "http://10.5.225.105:3333/";
const URL = "http://localhost:3000/tasks/";

addEventListener("DOMContentLoaded", async () => {
    let text = textTask.value;
    console.log(text);
});

const getTasks = async () => {
    try {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    }
};

const createTask = async () => {
    try {
        const text = textTask.value;
        const data = {
            title: text,
        };
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error al crear tarea:", error);
    }
};

const updateTask = async () => {
    const text = textTask.value;
    if (!text) return;

    try {
        await fetch(`${URL}${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: text }),
        });
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
    }
};

const deleteTask = async (e) => {
    const deleteTaskBtn = e.target.closest(".todo__button--delete");

    if (!deleteTaskBtn) return;

    const id = deleteTaskBtn.id;

    try {
        const response = await fetch(`${URL}${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
};

const showTasks = async () => {
    try {
        const tasks = await getTasks();
        listTasks.innerHTML = "";

        if (!tasks.length) {
            listTasks.innerHTML = `
                <span>No hay tareas aun...</span>
                <span>Crea algunas tareas</span>
            `;
            return;
        }

        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.className = "todo__item";
            li.id = `${task.id}`;
            li.innerHTML = `
                <span class="todo__text">${task.title}</span>
                <div class="todo__actions">
                    <button class="todo__button todo__button--update" id="${task.id}">Actualizar</button>
                    <button class="todo__button todo__button--delete" id="${task.id}">Borrar</button>
                </div>
            `;
            listTasks.append(li);
        });
    } catch (error) {
        console.error("Error al mostrar tareas:", error);
    }
};

getTasksBtn.addEventListener("click", async () => {
    await showTasks();
});

addTaskBtn.addEventListener("click", async () => {
    if (editingId) {
        await updateTask();
        editingId = null;
        addTaskBtn.textContent = "Crear";
    } else {
        await createTask();
    }
    await showTasks();
    textTask.value = "";
});

listTasks.addEventListener("click", async (e) => {
    const updateBtn = e.target.closest(".todo__button--update");
    if (updateBtn) {
        editingId = updateBtn.id;
        const li = updateBtn.closest(".todo__item");
        textTask.value = li.querySelector(".todo__text").textContent;
        addTaskBtn.textContent = "Actualizar";
        textTask.focus();
        return;
    }

    await deleteTask(e);
    await showTasks();
});
