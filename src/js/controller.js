import * as model from "./model.js";
import headerView from "./views/headerView.js";
import listView from "./views/listView.js";
import addTaskView from "./views/addTaskView.js";

const listRender = function () {
  listView.render(model.state.currentScreen, model.state.tasks);
};

const controlScreen = function (screen) {
  model.state.currentScreen = screen;
  headerView.toggleScreen(screen);
  listRender();
};

const controlAddTask = function (task) {
  model.addNewTask(task);
  controlScreen("tasks");
};

const controlUpdateTask = function (taskId, action) {
  if (action === "completed") model.updateTask(taskId);
  if (action === "delete") model.deleteTask(taskId);

  listRender();
};

const init = function () {
  headerView.addHandlerCurrentScreen(controlScreen);
  headerView.toggleScreen(model.state.currentScreen);
  listRender();
  listView.addHandlerUpdateTask(controlUpdateTask);
  addTaskView.addHandlerNewTask(controlAddTask);
};

init();
