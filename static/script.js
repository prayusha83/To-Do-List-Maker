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
            <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
                <span class="task-text">${task.title}</span>
                <button class="edit">✏️</button>
                <button class="delete">🗑️</button>
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

list.addEventListener("click", async (event) => {
    const li = event.target.closest("li");
    if (!li)
        return;

    const taskId = li.dataset.id;
    const textSpan = li.querySelector(".task-text");

    // DELETE
    if (event.target.classList.contains("delete")) {
        await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
            method: "DELETE"
        });
        fetchTasks();
    }

    // EDIT
    if (event.target.classList.contains("edit")) {
        const newText = prompt("Edit task:", textSpan.innerText);
        if (!newText) 
            return;

        await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newText.trim(),
                completed: li.classList.contains("completed")
            })
        });

        fetchTasks();
    }

    // TOGGLE COMPLETE
    if (event.target.tagName === "LI" || event.target.classList.contains("task-text")) {
        const completed = !li.classList.contains("completed");

        await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: textSpan.innerText,
                completed: completed
            })
        });

        fetchTasks();
    }
});

// Load tasks when page loads
fetchTasks();
