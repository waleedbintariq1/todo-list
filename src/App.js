import React, { useState, useEffect } from "react";
import TodoList from "./My Components/TodoList";
import InputTodo from "./My Components/InputTodo";

import "./App.css";
import {
  axiosGetTodos,
  axiosAddTodo,
  axiosDeleteTodo,
  axiosEditTodo,
} from "./axios";

import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [purpose, setPurpose] = useState("");
  const [editIndex, setEditIndex] = useState();

  const [todo, setTodo] = useState({
    checkboxState: false,
    desc: "",
    date: new Date().toString(),
  });

  useEffect(() => {
    axiosGetTodos().then((res) => setTodoList(res.data));
  }, []);

  const handleDelete = (index) => {
    axiosDeleteTodo(index).then((res) => setTodoList(res.data));
  };

  const handleAdd = (todo) => {
    setTodoList((prevList) => [...prevList, todo]);

    axiosAddTodo({ ...todo })
      .then((res) => console.log(res.data))
      .catch((err) => console.error());

    // clearing todo so that next todo can be added
    setTodo({ ...todo, desc: "" });
  };

  const handleType = (value) => {
    // our value in this case is an object
    // that's why we use curly braces
    setTodo({ ...todo, desc: value });
  };

  const handleEdit = (index) => {
    setPurpose("edit");
    setEditIndex(index);
  };

  const handleEdit2 = (updatedTodo) => {
    let updatedTodoList = [...todoList];
    updatedTodoList[editIndex] = updatedTodo;
    setTodoList(updatedTodoList);

    axiosEditTodo({ ...updatedTodo }, editIndex)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    // clearing todo so that next todo can be added
    setTodo({ ...todo, desc: "" });
  };

  return (
    <div className="container mt-5 p-3 w-50 customBorder">
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => {
          setPurpose("add");
        }}
      >
        Add Todo
      </button>
      <InputTodo
        purpose={purpose}
        onAdd={handleAdd}
        onEdit={handleEdit2}
        onType={handleType}
        todo={todo}
      ></InputTodo>
      {/* {FIXME Add a check so that following component only renders when count of todoList changes or we are editing a todo } */}
      <TodoList
        todoList={todoList}
        onDelete={handleDelete}
        onEdit={handleEdit}
      ></TodoList>
    </div>
  );
}

export default App;
