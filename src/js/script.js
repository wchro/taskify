// Screens
const list = document.querySelector("main");
const add_section = document.querySelector(".add-new");
let currentScreen = list;

// Nav
const nav = document.querySelector("nav");
const nav_tasks = document.getElementById("nav_tasks");
const nav_completed = document.getElementById("nav_completed");
const add_new = document.querySelector(".add");

const update_tasks = (completed) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const tasks_list = tasks.tasks
    ? tasks.tasks
        .reverse()
        .map((task) =>
          task.completed == completed
            ? `<div class="container">
  <div class="list-item">
    <div class="check-list" onclick="switchStatus(${task.id}, ${
                completed ? false : true
              })">${completed ? '<div class="completed"></div>' : ""}</div>
    <div class="list-title">
    ${task.title}
    </div>
    <div class="delete-task" onclick="delTask(${task.id}, ${
                completed ? true : false
              })">🗑️</div>

  </div>
  </div>`
            : ""
        )
        .join("")
    : false;
  const html_code = tasks_list
    ? tasks_list
    : `<div class="status">${
        completed ? "Empty 😭" : "No tasks pending 🎉"
      }</div>`;

  currentScreen.innerHTML = html_code;
  return html_code;
};

const switchScreen = (screen) => {
  switch (screen) {
    case "tasks":
      currentScreen.style.display = "none";
      nav.style.borderBottomLeftRadius = "unset";
      nav.style.borderBottomRightRadius = "unset";
      add_new.style.display = "flex";
      list.style.display = "unset";
      currentScreen = list;
      nav_tasks.style.fontWeight = "600";
      nav_completed.style.fontWeight = "unset";
      update_tasks(false);
      break;
    case "completed":
      currentScreen.style.display = "none";
      nav.style.borderBottomLeftRadius = "unset";
      nav.style.borderBottomRightRadius = "unset";
      add_new.style.display = "flex";
      list.style.display = "unset";
      currentScreen = list;
      nav_tasks.style.fontWeight = "unset";
      nav_completed.style.fontWeight = "600";
      update_tasks(true);
      break;
    case "add":
      currentScreen.style.display = "none";
      nav_tasks.style.fontWeight = "unset";
      nav_completed.style.fontWeight = "unset";
      add_new.style.display = "none";
      nav.style.borderBottomLeftRadius = "20px";
      nav.style.borderBottomRightRadius = "20px";
      add_section.style.display = "flex";
      currentScreen = add_section;
      break;
  }
};

const saveTask = (el) => {
  el.preventDefault();
  const task_name = document.getElementById("task").value;

  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.tasks.push({
    id: tasks.tasks.length + 1,
    title: task_name,
    completed: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  switchScreen("tasks");
  update_tasks(false, "tasks");
  document.getElementById("task").value = "";
};

const delTask = (taskid, screen) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task_id = tasks.tasks.findIndex((task) => task.id == taskid);
  tasks.tasks.splice(task_id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  update_tasks(screen);
};

const switchStatus = (n, status) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task_index = tasks.tasks.findIndex((task) => task.id == n);
  tasks.tasks[task_index].completed = status;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  update_tasks(!status);
};

add_new.addEventListener("click", () => switchScreen("add"));
document.getElementById("new-task-form").addEventListener("submit", saveTask);

document
  .getElementById("nav_tasks")
  .addEventListener("click", () => switchScreen("tasks"));
document
  .getElementById("nav_completed")
  .addEventListener("click", () => switchScreen("completed"));

// START
(() => {
  !localStorage.getItem("tasks") &&
    localStorage.setItem("tasks", JSON.stringify([]));
  nav_tasks.style.fontWeight = "600";
  update_tasks(false);
})();
