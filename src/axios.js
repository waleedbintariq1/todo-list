import axios from "axios";

const TODO_PORT = 5000;
const USER_PORT = 5001;

function axiosGetTodos() {
  return axios({
    method: "GET",
    url: `http://localhost:${TODO_PORT}/getTodos`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosAddTodo(todo) {
  const data = { ...todo };

  return axios({
    method: "POST",
    url: `http://localhost:${TODO_PORT}/addTodo`,
    data: todo,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosDeleteTodo(id) {
  return axios({
    method: "DELETE",
    url: `http://localhost:${TODO_PORT}/deleteTodo`,
    data: { id },
  });
}

function axiosEditTodo(updatedTodo, index) {
  const data = {
    updatedTodo: { ...updatedTodo },
    index,
  };

  return axios({
    method: "PUT",
    url: `http://localhost:${TODO_PORT}/editTodo`,
    data,
  });
}

function axiosSignup(user) {
  const data = { ...user };

  return axios({
    method: "POST",
    url: `http://localhost:${USER_PORT}/signupUser`,
    data,
  });
}

function axiosLogin(user) {
  const data = { ...user };
  return axios({
    method: "POST",
    url: `http://localhost:${USER_PORT}/loginUser`,
    data,
  });
}

function axiosLoginConfirm() {
  return axios({
    method: "POST",
    url: `http://localhost:${USER_PORT}/confirmLogin`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export {
  axiosGetTodos,
  axiosAddTodo,
  axiosDeleteTodo,
  axiosEditTodo,
  axiosSignup,
  axiosLogin,
  axiosLoginConfirm,
};
