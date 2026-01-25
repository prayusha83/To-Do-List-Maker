const input = document.getElementById("TaskInput");
const button = document.getElementById("AddBtn");
const list = document.getElementById("TaskList");
const count = document.getElementById("TaskCount");
const emptyMsg = document.getElementById("EmptyMessage");

let tasks = [];
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  tasks = JSON.parse(savedTasks) || []; 
}

function renderTasks() {
  list.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task) => {
    if (task.completed) completedCount++;

    list.innerHTML += `
            <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
                <span class="task-text">${task.title}</span>
                <button class="edit">✏️</button>
                <button class="delete">×</button>
            </li>
        `;
  });

  if (tasks.length === 0) {
    count.textContent = "";
    emptyMsg.style.display = "block"; //block means element is visible
  } else {
    count.textContent = `${completedCount} / ${tasks.length} completed`;
    emptyMsg.style.display = "none"; //none means element is hidden
  }
}

input.addEventListener("input", function () {
  const userInput = input.value;
  const trimmedInput = userInput.trim();
  const isEmpty = trimmedInput === "";

  if (isEmpty) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});

button.addEventListener("click", function () {
  const TaskText = input.value.trim();

  if (TaskText === "") {
    alert("Task cannot be empty!!");
    return;
  }

  const task = {
    id: Date.now(),
    title: TaskText,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
  button.disabled = true;
});

list.addEventListener("click", function (event) {
  const li = event.target.closest("li");
  if (!li) return;

  const taskId = Number(li.dataset.id);

  const task = tasks.find((t) => t.id === taskId);

  if (event.target.classList.contains("delete")) {
    tasks = tasks.filter((t) => t.id !== taskId);
    saveTasks();
    renderTasks();
    return;
  }

  if (event.target.classList.contains("edit")) {
    const newText = prompt("Edit task:", task.title);
    if (newText && newText.trim() !== "") {
      task.title = newText.trim();
      saveTasks();
      renderTasks();
    }
    return;
  }

  task.completed = !task.completed;
  saveTasks();
  renderTasks();
});

loadTasks();
renderTasks();
