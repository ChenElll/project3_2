// ---------spa--------------------------------
const app = {
  pages: [],
  show: new Event("show"),
  init: function () {
    app.pages = document.querySelectorAll(".page");
    app.pages.forEach((pg) => {
      pg.addEventListener("show", app.pageShown);
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", app.nav);
    });
    // window.addEventListener("popstate", app.poppin);
  },
  nav: function (ev) {
    ev.preventDefault();
    let currentPage = ev.target.getAttribute("data-target");
    if (currentPage !== "todo-list") {
      document.querySelector(".active").classList.remove("active");
      document.getElementById(currentPage).classList.add("active");
      console.log(currentPage);
      history.pushState({}, currentPage, `#${currentPage}`);
      document.getElementById(currentPage).dispatchEvent(app.show);
    } else {
      loginAttempt();
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);

//   ------------signup --------------------

// let localdb = new db_api();

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fxhr = new FXMLHttpRequest();

    // Gets the username, email, and password entered in the form
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    fxhr.open("POST", "");
    fxhr.send({ username: username, password: password }, (message) => {
      alert(message);
    });
  });

//--------------------login --------------------

// Creating a Map to store the number of login attempts for each user
// const loginAttempts = new Map();
function loginAttempt() {
  const fxhr = new FXMLHttpRequest();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  fxhr.open("GET", "");
  fxhr.send({ username: username, password: password }, (message) => {
    alert(message);
  });


}

//---------------todoList------------------------

const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = getUserTasklist();

function getUserTasklist() {
  let userTasklist = [];

  const fxhr = new FXMLHttpRequest();
  fxhr.open("GET", "");
  fxhr.send({ "tasks": "tasks" }, (tasklist) => {
    userTasklist = tasklist;
  });

  return userTasklist;
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task">
                          <label for="${id}">
                              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                              <p class="${completed}">${todo.name}</p>
                          </label>
                          <div class="settings">
                              <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                              <ul class="task-menu">
                                  <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                  <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                              </ul>
                          </div>
                      </li>`;
      }
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}
showTodo("all");

function updateStatus(selectedTask) {
  // Retrieve the task name element associated with the selected checkbox
  let taskName = selectedTask.parentElement.lastElementChild;

  // Check if the selectedTask checkbox is checked
  if (selectedTask.checked) {
    // If the checkbox is checked, add the "checked" class to the taskName element
    taskName.classList.add("checked");

    // Update the status of the corresponding task in the todos array to "completed"
    todos[selectedTask.id].status = "completed";
  } else {
    // If the checkbox is not checked, remove the "checked" class from the taskName element
    taskName.classList.remove("checked");

    // Update the status of the corresponding task in the todos array to "pending"
    todos[selectedTask.id].status = "pending";
  }

  const fxhr = new FXMLHttpRequest();

  fxhr.open("POST", "");
  fxhr.send({ "tasks": todos });

  // Persist the updated todos array to the browser's local storage
  // localStorage.setItem("todo-list", JSON.stringify(todos));
}


