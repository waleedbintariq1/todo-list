import axios from "axios";

const port = 5000;

function axiosGetTodos() {
  return axios({
    method: "GET",
    url: `http://localhost:${port}/getTodos`,
  });
}

function axiosAddTodo({ ...todo }) {
  return axios({
    method: "POST",
    url: `http://localhost:${port}/addTodo`,
    data: todo,
  });
}

function axiosDeleteTodo(index) {
  return axios({
    method: "DELETE",
    url: `http://localhost:${port}/deleteTodo`,
    data: { index },
  });
}

export { axiosGetTodos, axiosAddTodo, axiosDeleteTodo };
