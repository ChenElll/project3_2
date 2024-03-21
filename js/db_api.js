class db_api {
  users = [];
  tasks = [];

  add_user(new_user) {
    this.users = JSON.parse(localStorage.getItem("users"));
    if (this.is_user_exists(new_user)) {
      return false;
    }
    this.users.push(new_user);
    localStorage.setItem("users", JSON.stringify(this.users));
    return true;
  }

  is_user_exists(user_to_serch) {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      users = [];
      return false;
    }
    for (const user of users) {
      if (user.username == user_to_serch.username) {
        return true;
      }
    }
    return false;
  }

  get_user_data(username_to_get) {
    let users = JSON.parse(localStorage.getItem("users"));
    for (const user of users) {
      if (user.username == username_to_get) {
        return user;
      }
    }
    return null;
  }

  get_user_taskslist(username_to_get) {
    this.tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!this.tasks) {
      this.tasks = [];
    }
    let users_tasks = [];
    for (const task of this.tasks) {
      if (task.username == username_to_get) {
        users_tasks.push(task);
      }
    }
    return users_tasks;
  }



  add_task(username_to_add_task,new_task) {
    this.tasks.push({username: username_to_add_task, task: new_task});
    return this.get_user_taskslist(username_to_add_task);
  }
  
}
