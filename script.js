const input = document.getElementById("TaskInput");
const button = document.getElementById("AddBtn");
const list = document.getElementById("TaskList");

button.addEventListener("click", function(){
    console.log("Add button clicked!");
});


let tasks=[];
// tasks is  [ { id: 1, title: "Study", completed: false } ]


// save to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // "[{"id":1,"title":"Study","completed":false}]", is string, not array
}

// load from local storage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks"); //string
    tasks = JSON.parse(savedTasks) || []; //parse the string to js
    // {"id":1,"title":"Study","completed":false} will go in tasks
    // if no savedtasks, [] ie empty array will be stored
 }

function renderTasks() {
    list.innerHTML = "";

    //For each task object inside the tasks array
    tasks.forEach(task => {
        list.innerHTML += `
            <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
                <span class="task-text">${task.title}</span>
                <button class="edit">✏️</button>
                <button class="delete">×</button>
            </li>
        `;
    });
}


button.addEventListener("click", function(){
    const TaskText = input.value;

    if (TaskText.trim() === ""){ 
        return;
    }

    const task = {
        id: Date.now(),
        title: TaskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    input.value=""; //to clear tasks from input field after clicking add button
});




list.addEventListener("click", function (event) {

    // Go up from what I clicked until you find the nearest <li>
    const li = event.target.closest("li");
    if (!li) return;

    // <li data-id=...> to access that, we write dataset.id
    const taskId = Number(li.dataset.id);
    // reads <li data-id="123"> and converts it to number.

    const task = tasks.find(t => t.id === taskId);
    // for t in tasks:
    // if t["id"] == taskId:
    //     return t
    // .find() returns the actual object, Not a copy, So modifying it changes the array.

    // .filter():
    // Loops through the array
    // Keeps items that return true
    // Removes items that return false
    // Returns a new array


    if (event.target.classList.contains("delete")) {
        tasks = tasks.filter(t => t.id !== taskId);
        // tasks = [t for t in tasks if t["id"] != taskId]
        // Keep all tasks EXCEPT the one with this ID
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

    // Toggle completed state
    task.completed = !task.completed;
        saveTasks();
        renderTasks();

});

loadTasks();
renderTasks();


