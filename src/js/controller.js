import * as model from "./model.js";
import headerView from "./views/headerView.js";
import listView from "./views/listView.js";
import addTaskView from "./views/addTaskView.js";

const controlScreen = function (screen) {
  model.state.currentScreen = screen;
  headerView.toggleScreen(screen);
  listView.render(model.state.currentScreen, model.state.tasks);
};

const controlAddTask = function (task) {
  model.addNewTask(task);
  controlScreen("tasks");
};

const init = function () {
  headerView.addHandlerCurrentScreen(controlScreen);
  headerView.toggleScreen(model.state.currentScreen);
  listView.render(model.state.currentScreen, model.state.tasks);
  addTaskView.addHandlerNewTask(controlAddTask);
};

init();
