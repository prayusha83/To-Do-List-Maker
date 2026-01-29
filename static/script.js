const input = document.getElementById("TaskInput");
const button = document.getElementById("AddBtn");
const list = document.getElementById("TaskList");

// Fetch tasks from backend and render
async function fetchTasks() {
    const response = await fetch("http://127.0.0.1:8000/tasks");
    const tasks = await response.json();

    list.innerHTML = "";

    tasks.forEach(task => {
        list.innerHTML += `
            <li class="${task.completed ? "completed" : ""}">
                ${task.title}
            </li>
        `;
    });
}

// Add task (POST to backend)
button.addEventListener("click", async function () {
    const text = input.value.trim();
    if (text === "") 
      return;

    await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: text,
            completed: false
        })
    });

    input.value = "";
    fetchTasks(); // sync UI with backend
});

// Load tasks when page loads
fetchTasks();
