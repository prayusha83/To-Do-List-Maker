const input = document.getElementById("TaskInput");
const button = document.getElementById("AddBtn");
const list = document.getElementById("TaskList");

button.addEventListener("click", function(){
    console.log("Add button clicked!");
});


let tasks=[]
button.addEventListener("click", function(){
    const TaskText = input.value;

    if (TaskText.trim() === ""){ 
        return;
    }

    tasks.push(TaskText);
    // console.log(tasks);
    list.innerHTML += `
        <li>
            <span class="task-text">${TaskText}</span> 
            <button class="edit">✏️</button>
            <button class="delete">×</button>
        </li>
        `; //span, not div cuz div wouldve made pen and x in new line
    input.value=""; //to clear tasks from input field after clicking add button
});

/* toggle means:
“If class exists → remove it
If class doesn’t exist → add it */
// list.addEventListener("click", function(event){
//     // event.target.tagName means if <tagname>(here LI) element is clicked
//     if(event.target.tagName==="LI"){
//         event.target.classList.toggle("completed");
//     }
// })


list.addEventListener("click", function(event){

    if(event.target.classList.contains("delete")){
        const li = event.target.parentElement; //means <li> for <button>
        li.remove(); //removing the parent element ie one task
    }

    if (event.target.classList.contains("edit")){
        const li = event.target.parentElement;

        // queryselector(.tasktext) --> inside THIS li, find the element with class task-text
        const textSpan = li.querySelector(".task-text");

        const newText = prompt("Edit your task:", textSpan.innerText);
        if (newText !== null && newText.trim() !== "") {
            textSpan.innerText = newText;
        }

    }
});

