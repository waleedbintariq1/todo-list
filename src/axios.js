import axios from "axios";

const TODO_PORT = 5001;
const USER_PORT = 5001;

function axiosGetTodos() {
  // GET methods do not contain a body
  // as such, we cannot pass data in this request

  console.log("inside axiosGetTodos");

  let userId = localStorage.getItem("userId");
  console.log(userId);

  console.log(localStorage.getItem("token"));

  return axios({
    method: "GET",
    url: `https://localhost:${TODO_PORT}/api/Todos/${userId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

function axiosAddTodo(todo) {
  // The name "TodoAPIUserId" must be exactly the same as the property of receiving object in backend
  let data = { ...todo, TodoAPIUserId: localStorage.getItem("userId") };
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
  // The name "TodoAPIUserId" must be exactly the same as the property of receiving object in backend
  let data = { ...updatedTodo, TodoAPIUserId: localStorage.getItem("userId") };

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
