export const state = {
  currentScreen: "tasks",
  tasks: [],
};

// Switch screens
export const switchScreen = function (screen) {
  state.currentScreen = screen;
};

const saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
};

export const addNewTask = function (task) {
  state.tasks.push(task);
  saveTasks();
};

const init = function () {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
};

init();
