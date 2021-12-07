import axios from "axios";

const TODO_PORT = 5001;
const USER_PORT = 5001;

function axiosGetTodos() {
  // GET methods do not contain a body
  // as such, we cannot pass data in this request

  let email = localStorage.getItem("email");

  console.log(localStorage.getItem("token"));

  return axios({
    method: "GET",
    url: `https://localhost:${TODO_PORT}/api/Todos/${email}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosAddTodo(todo) {
  let data = { ...todo, email: localStorage.getItem("userEmail") };
  // now data is in the same format as Todo entity in dot net backend
  return axios({
    method: "POST",
    url: `https://localhost:${TODO_PORT}/api/Todos`,
    data,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosDeleteTodo(id) {
  console.log("inside axios delete todo");
  return axios({
    method: "DELETE",
    url: `https://localhost:${TODO_PORT}/api/Todos/${id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosEditTodo(updatedTodo) {
  let data = { ...updatedTodo, email: localStorage.getItem("userEmail") };

  return axios({
    method: "PUT",
    url: `https://localhost:${TODO_PORT}/api/Todos`,
    data,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosSignup(user) {
  console.log("inside axios signup");
  const data = { ...user };

  return axios({
    method: "POST",
    url: `https://localhost:${USER_PORT}/api/Account/Register`,
    data,
  });
}

function axiosLogin(user) {
  console.log("inside axios login");
  const data = { ...user };
  return axios({
    method: "POST",
    url: `https://localhost:${USER_PORT}/api/Account/Login`,
    data,
  });
}

function axiosLoginConfirm() {
  return axios({
    method: "POST",
    url: `https://localhost:${USER_PORT}/api/Account/LoginConfirm`,
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
