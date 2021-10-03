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

function axiosDeleteTodo(id) {
  console.log("in axios: ");
  console.log(id);
  return axios({
    method: "DELETE",
    url: `http://localhost:${port}/deleteTodo`,
    data: { id },
  });
}

function axiosEditTodo({ ...updatedTodo }, index) {
  const data = {
    updatedTodo: updatedTodo,
    index: index,
  };

  return axios({
    method: "PUT",
    url: `http://localhost:${port}/editTodo`,
    data,
  });
}

export { axiosGetTodos, axiosAddTodo, axiosDeleteTodo, axiosEditTodo };
