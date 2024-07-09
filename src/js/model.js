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

const getTaskIndex = function (taskId) {
  return state.tasks.findIndex((task) => task.id === taskId);
};

export const updateTask = function (taskId) {
  const index = getTaskIndex(taskId);
  const task = state.tasks[index];

  task.completed = !task.completed;
  state.tasks[index] = task;
  saveTasks();
};

export const deleteTask = function (taskId) {
  const index = getTaskIndex(taskId);
  state.tasks.splice(index, 1);
  saveTasks();
};

const init = function () {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
};

init();
