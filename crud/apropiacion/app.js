const textTask = document.getElementById("todoInput");
const listTasks = document.getElementById("todoList");
const currentUser = null

const URL = "http://10.5.225.105:3333/";

addEventListener("DOMContentLoaded", async () => {
    let text = textTask.value;
    console.log(text);
    console.log();
    await getUsers();
});

const getUsers = async () => {
    let response = await fetch(`${URL}users`);
    let data = await response.json();
    console.log(data);

    /* 
    email:"ana.torres@mail.com"
    id:"1001234567"
    name:"Ana Torres"
    */
};


const getTasks = async (userId) => {
    let response = await fetch(`${URL}tasks?id=${userId}`);
    let data = await response.json();
    console.log(data);

    /* 
    email:"ana.torres@mail.com"
    id:"1001234567"
    name:"Ana Torres"
    */
};


const showTasks = async (data) => {
    listTasks
    document.createElement('li')
    listTasks.innerHTML(
        `
        <li class="todo__item" id="task-1">
                <span class="todo__text" id="taskText-1">Example Task</span>
                <div class="todo__actions">
                    <button class="todo__button todo__button--update" id="updateBtn-1">Update</button>
                    <button class="todo__button todo__button--delete" id="deleteBtn-1">Delete</button>
                </div>
            </li>
        `
    )
};
