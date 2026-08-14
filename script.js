// Starting tasks
let tasks = [
  { id: 1, text: "Practice SQL joins", done: false },
  { id: 2, text: "Revise HTML tags", done: true },
  { id: 3, text: "Build Power BI dashboard", done: true },
  { id: 4, text: "Push project to GitHub", done: true }
];

// Get elements from the page
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let progressFill = document.getElementById("progressFill");
let progressBadge = document.getElementById("progressBadge");

// Add a new task
function addTask() {
  let text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  let newTask = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  showTasks();
}

// Mark task done / not done
function toggleTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  showTasks();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  showTasks();
}

// Edit a task
function editTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      let newText = prompt("Edit task:", tasks[i].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[i].text = newText.trim();
      }
    }
  }
  showTasks();
}

// Show all tasks on the page
function showTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<li class='empty'>No tasks yet 🎉</li>";
  }

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    li.innerHTML =
      "<div class='check-circle'>" + (task.done ? "✓" : "") + "</div>" +
      "<span class='task-text'>" + task.text + "</span>" +
      "<button class='icon-btn edit-btn'>✎</button>" +
      "<button class='icon-btn delete-btn'>🗑</button>";

    // Button clicks
    li.querySelector(".check-circle").onclick = function () {
      toggleTask(task.id);
    };
    li.querySelector(".edit-btn").onclick = function () {
      editTask(task.id);
    };
    li.querySelector(".delete-btn").onclick = function () {
      deleteTask(task.id);
    };

    taskList.appendChild(li);
  }

  updateProgress();
}

// Update progress bar and badge
function updateProgress() {
  let total = tasks.length;
  let doneCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      doneCount++;
    }
  }

  let percent = total === 0 ? 0 : (doneCount / total) * 100;
  progressFill.style.width = percent + "%";
  progressBadge.textContent = doneCount + " / " + total;
}

// Button click and Enter key to add task
addBtn.onclick = addTask;
taskInput.onkeydown = function (e) {
  if (e.key === "Enter") {
    addTask();
  }
};

// Show tasks when page loads
showTasks();