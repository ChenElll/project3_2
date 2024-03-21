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
todos;

