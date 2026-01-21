const input = document.getElementById("TaskInput");
const button = document.getElementById("AddBtn");
const list = document.getElementById("TaskList");

button.addEventListener("click", function(){
    console.log("Add button clicked!");
});

// button.addEventListener("click", function(){
//     const TaskText = input.value;
//     console.log(TaskText);
// });


let tasks=[]

button.addEventListener("click", function(){
    const TaskText = input.value;
    tasks.push(TaskText);
    // console.log(tasks);
    list.innerHTML += `<li>${TaskText}</li>`;
    input.value=""; //to clear tasks from input field after clicking add button
});