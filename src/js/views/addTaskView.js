class AddTaskView {
  _parentEl = document.querySelector(".add-form");

  addHandlerNewTask(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataEntries = [...new FormData(this)];
      const data = Object.fromEntries(dataEntries);
      this.reset();
      const newTask = {
        id: new Date().valueOf(),
        title: data.task,
        completed: false,
      };

      handler(newTask);
    });
  }
}

export default new AddTaskView();
