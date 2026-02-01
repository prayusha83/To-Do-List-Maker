const input = document.getElementById("TaskInput");
const button = document.getElementById("AddBtn");
const list = document.getElementById("TaskList");
const count = document.getElementById("TaskCount");
const emptyMsg = document.getElementById("EmptyMessage");

// Fetch tasks from backend and render
async function fetchTasks() {
    console.log("fetchTasks() called")
    const response = await fetch("http://127.0.0.1:8000/tasks");

    if (!response.ok) {
        console.error("Failed to fetch tasks");
        return;
    }
    const tasks = await response.json();

    list.innerHTML = "";
    let completedCount = 0;

    tasks.forEach((task) => {
        if (task.completed) completedCount++;

        list.innerHTML += `
                    <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
                        <span class="task-text">${task.title}</span>
                        <button class="edit">✏️</button>
                        <button class="delete">🗑️</button>
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

// Add task (POST to backend)
button.addEventListener("click", async function () {
    const text = input.value.trim();
    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: text,
        completed: false,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        alert(error.detail);
        return;
    }

    input.value = "";
    fetchTasks();
});


list.addEventListener("click", async (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    const taskId = li.dataset.id;
    const textSpan = li.querySelector(".task-text");

    // DELETE
    if (event.target.classList.contains("delete")) {
        await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "DELETE",
        });
        fetchTasks();
    }

    // EDIT
    if (event.target.classList.contains("edit")) {
        const newText = prompt("Edit task:", textSpan.innerText);
        if (!newText || newText.trim() === "") {
            alert("Task cannot be empty");
            return;
        }


        await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: newText.trim(),
            completed: li.classList.contains("completed"),
        }),
        });

        fetchTasks();
        return
    }

    // TOGGLE COMPLETE
    if (
        event.target.tagName === "LI" ||
        event.target.classList.contains("task-text")
    ) {
        const completed = !li.classList.contains("completed");

        await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: textSpan.innerText,
            completed: completed,
        }),
        });

        fetchTasks();
    }
});

// Load tasks when page loads
fetchTasks();
