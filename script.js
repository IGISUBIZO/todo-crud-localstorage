document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('clear-all').addEventListener('click', clearAllTasks);

let editingTaskName = null; // Variable to keep track of the task being edited

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task));
}

function addTask(e) {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskType = document.getElementById('task-type').value;
    const taskDescription = document.getElementById('task-description').value;
    const taskBg = document.getElementById('task-bg').value;

    const task = { taskName, taskType, taskDescription, taskBg };

    if (editingTaskName) {
        updateTask(task);
    } else {
        saveTaskToLocalStorage(task);
        displayTask(task);
    }
    document.getElementById('task-form').reset();
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(task) {
    const taskList = document.getElementById('task-list');
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.style.backgroundColor = task.taskBg;
    taskCard.innerHTML = `
        <h3>${task.taskName} (${task.taskType})</h3>
        <p>${task.taskDescription}</p>
        <button onclick="deleteTask('${task.taskName}')">Delete</button>
        <button onclick="editTask('${task.taskName}')">Edit</button>
    `;
    taskList.appendChild(taskCard);
}

function deleteTask(taskName) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.taskName !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('task-list').innerHTML = '';
    loadTasks();
}

function editTask(taskName) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToEdit = tasks.find(task => task.taskName === taskName);

    if (taskToEdit) {
        document.getElementById('task-name').value = taskToEdit.taskName;
        document.getElementById('task-type').value = taskToEdit.taskType;
        document.getElementById('task-description').value = taskToEdit.taskDescription;
        document.getElementById('task-bg').value = taskToEdit.taskBg;

        editingTaskName = taskToEdit.taskName; // Set the task name being edited
    }
}

function updateTask(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.taskName === editingTaskName ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('task-list').innerHTML = '';
    loadTasks();
    editingTaskName = null; // Reset editing task name
}

function clearAllTasks() {
    localStorage.removeItem('tasks');
    document.getElementById('task-list').innerHTML = '';
}
