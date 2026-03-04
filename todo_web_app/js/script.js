const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");
const taskCount = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(task.priority.toLowerCase());

        const topDiv = document.createElement("div");
        topDiv.classList.add("task-top");

        const taskText = document.createElement("span");
        taskText.innerText = `${task.text} (${task.date})`;
        if (task.completed) taskText.classList.add("completed");

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "✔";
        completeBtn.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => {
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            renderTasks();
        };

        btnDiv.appendChild(completeBtn);
        btnDiv.appendChild(deleteBtn);

        topDiv.appendChild(taskText);
        topDiv.appendChild(btnDiv);

        li.appendChild(topDiv);
        taskList.appendChild(li);
    });

    taskCount.innerText = `Total Tasks: ${tasks.length}`;
}

addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    });

    taskInput.value = "";
    taskDate.value = "";
    saveTasks();
    renderTasks();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

renderTasks();