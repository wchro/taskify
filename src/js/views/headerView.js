class HeaderView {
  _parentEl = document.querySelector(".header");
  _navigation = document.querySelector(".list");

  _taskListSection = document.querySelector("main");
  _addTaskSection = document.querySelector(".add-new");

  toggleScreen(screen) {
    // If screen === add, hide list section and show the form, and vice versa
    this._addTaskSection.style.display = screen === "add" ? "flex" : "none";
    this._taskListSection.style.display = screen === "add" ? "none" : "unset";

    // Active nav
    this._navigation.querySelectorAll("li").forEach((li) => {
      if (li.dataset.screen === screen) {
        li.style.fontWeight = "600";
      } else {
        li.style.fontWeight = "unset";
      }
    });
  }

  addHandlerCurrentScreen(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest("li") ?? e.target.closest(".add");
      if (!btn) return;
      const screen = btn.dataset.screen;
      handler(screen);
    });
  }
}

export default new HeaderView();
