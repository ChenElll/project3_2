class server {
  dbapi;
  logedinUser;

  constructor() {
    this.dbapi = new db_api();
  }


  prossess_data(data, dispatcher = (x) => {}) {
    let recivedData = JSON.parse(data);
    if (recivedData["d"].method === "POST") {
      if (recivedData["body"].username) {
        if (
          this.addUser(
            recivedData["body"].username,
            recivedData["body"].password
          )
        ) {
          dispatcher("success");
        } else {
          dispatcher("user alredy exist");
        }
      } 
    } else if (recivedData["d"].method === "GET") {
      if (recivedData["body"].username) {
        if (
          this.getUserData(
            recivedData["body"].username,
            recivedData["body"].password
          )
        ) {
          dispatcher("login successfully");
        } else {
          dispatcher("Incorrect username or password");
        }
      } 
    }
  }

  addUser(username, password) {
    if (!this.dbapi.add_user({ username, password })) {
      return false;
    } else {
      window.location.reload();
      return true;
    }
  }

  validation(name, pass) {
    let user = this.dbapi.get_user_data(name);
    if (user && user.username == name && user.password == pass) {
      return true;
    }
    return false;
  }

  getUserData(username, password) {
    if (!this.validation(username, password)) {
      window.location.reload();
      return false;
    } else {
      this.logedinUser = this.dbapi.get_user_data(username);

      let currentPage = "todo-list";
      document.querySelector(".active").classList.remove("active");
      document.getElementById(currentPage).classList.add("active");
      console.log(currentPage);
      history.pushState({}, currentPage, `#${currentPage}`);
      document.getElementById(currentPage).dispatchEvent(app.show);
      initTodos(username);

      return true;
    }
  }

}
