class ListView {
  _parentEl = document.querySelector("main");
  _tasks;

  render(screen, data) {
    let html = "";

    // Filter data
    const completed = screen === "tasks" ? false : true;
    this._tasks = data.filter((tasks) => tasks.completed === completed);

    // Check if there's data and generate markup
    if (this._tasks.length > 0) {
      html = this._generateMarkup(this._tasks);
    } else {
      html = `<div class="status">${
        screen === "tasks" ? "No tasks pending 🎉" : "Empty 😭"
      }</div>`;
    }

    // Rendering
    this._parentEl.innerHTML = html;
  }

  _generateMarkup(data) {
    return data
      .map(
        (task) => `<div class="container">
    <div class="list-item">
      <div class="check-list">${
        task.completed ? '<div class="completed"></div>' : ""
      }</div>
      <div class="list-title">
      ${task.title}
      </div>
      <div class="delete-task">🗑️</div>
  
    </div>
    </div>`
      )
      .join("");
  }
}

export default new ListView();
