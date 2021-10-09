import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import InputTodo from "./InputTodo";
import "../My CSS/HomePage.css";

import { useHistory } from "react-router-dom";

import {
  axiosGetTodos,
  axiosAddTodo,
  axiosDeleteTodo,
  axiosEditTodo,
  axiosLoginConfirm,
} from "../axios";

function HomePage(props) {
  const history = useHistory();
  const [todoList, setTodoList] = useState([]);

  const [purpose, setPurpose] = useState("");
  const [editIndex, setEditIndex] = useState();

  const [todo, setTodo] = useState({
    id: 0,
    desc: "",
    createdAt: new Date(),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("inside homepage use effect!");

    if (token != undefined) {
      // check validity of token
      axiosLoginConfirm().then((res) => {
        console.log(res.status);
        if (res.status == 403) {
          history.push("/");
        }
        if (res.status == 200) {
          axiosGetTodos().then((res) => setTodoList(res.data));
        }
      });
    } else {
      console.log("token is undefined");
    }
  }, []);

  const handleDelete = (id) => {
    axiosDeleteTodo(id).then((res) => setTodoList(res.data));
  };

  const handleAdd = (todo) => {
    axiosAddTodo({ ...todo })
      .then((res) => setTodoList((prevList) => [...prevList, res.data]))
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
    // find actual ID of the todo to be updated
    // actual ID refers to the id in the database for todo to be updated
    const actualID = todoList[editIndex].id;
    updatedTodo = { ...updatedTodo, id: actualID };

    axiosEditTodo(updatedTodo, editIndex)
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));

    // clearing todo so that next todo can be added
    setTodo({ ...todo, desc: "" });
  };

  return (
    <div className="container p-3 w-50 customBorder">
      <div className="homePageButtons">
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
      </div>

      <InputTodo
        purpose={purpose}
        onAdd={handleAdd}
        onEdit={handleEdit2}
        onType={handleType}
        todo={todo}
      ></InputTodo>

      <TodoList
        todoList={todoList}
        onDelete={handleDelete}
        onEdit={handleEdit}
      ></TodoList>
    </div>
  );
}

export default HomePage;
