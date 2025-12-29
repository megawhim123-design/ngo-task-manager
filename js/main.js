const form = document.getElementById("taskform");
const taskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("taskList");

form.addEventListener("submit", function(e) {
    e.preventDefault();

 const task = taskInput.value;
 
 const li = document.createElement("li");
    li.textContent = task;

    tasklist.appendChild(li);
    taskInput.value = "";
});


const API = "http://localhost:5000/tasks";

function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(tasks => {
            taskList.innerHTML ="";
            task.forEach(task => {
                const li =document.createElement("li");
                li.textContent = task.title;

                const btn = document.createElement("button");
                btn.textContent = "x";
                btn.onClick = () => deleteTask(task.id);

                li.appendChild(btn);
                taskList.appendChild(li);
            });
        });
}

function deleteTask(id) {
    fetch('${API}/${id}', {method: "DELETE"})
        .then(loadTasks);
}

form.addEventListener("submit", e => {
    e.preventDefault();
    fetch(API, {
        method: "POST",
        headers: { "Content-Tyoe": "application/json" },
        body: JSON.stringify({ title: taskInput.value })
    }).then(() => {
        taskInput.value = "";
        loadTasks();
    });
});

loadTasks();