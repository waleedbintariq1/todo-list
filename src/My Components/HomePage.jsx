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
    description: "",
    createdAt: new Date(),
  });

  // if we don't give any argument as the 2nd parameter for useEffect()
  // the hook works as both componentDidMount and componentDidUpdate lifecycle methods

  // if 2nd parameter is set to empty array, then it only works as componentDidMount

  // Difference is that when no argument is provided the useEffect is called again and again
  // which can be seen by the console logging the message
  // which results in the user being automatically taken back to login screen after token expires

  // problem: when second arg is not provided, cleanup func is executed again and again as well
  // only want cleanup func to execute once when the user logouts or token expires

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("inside homepage use effect!");

    if (token !== null) {
      // check validity of token
      axiosLoginConfirm()
        .then((res) => {
          axiosGetTodos()
            .then((res) => {
              console.log("after axiosGetTodos");
              console.log(res.data);
              setTodoList(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("token is no longer valid");
          history.push("/");
        });
    } else {
      console.log("token is null");
      history.push("/");
    }
  }, []);

  const handleDelete = (id) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(todoIndex, 1);

    // we can't directly put the list variable inside usestate set function
    // setTodoList(todoList) is wrong in this case
    // because react thinks that this is the same list as before
    // even though one of its items has been updated
    // as such it will not re-render

    // do the following to get react to re-render the component
    //setTodoList(() => [...todoList]);

    axiosDeleteTodo(id)
      .then((res) => {
        setTodoList(() => [...todoList]);
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
        alert("Token expired!");
      });
  };

  const handleAdd = (todo) => {
    axiosAddTodo({ ...todo })
      .then((res) => setTodoList((prevList) => [...prevList, res.data]))
      .catch((err) => {
        console.log(err);
        history.push("/");
        alert("Token expired!");
      });

    // clearing todo so that next todo can be added
    setTodo({ ...todo, description: "" });
  };

  const handleType = (value) => {
    // following syntax breaks up the todo object into its properties
    // then we can update the particular value
    // in this case, it is "description "
    setTodo({ ...todo, description: value });
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

    todoList[editIndex] = updatedTodo;

    axiosEditTodo(updatedTodo)
      .then(() => setTodoList(todoList))
      .catch((err) => {
        console.log(err);
        history.push("/");
        alert("Token expired!");
      });

    // clearing todo so that next todo can be added
    setTodo({ ...todo, description: "" });
  };

  return (
    <div className="container p-3 w-75 customBorder">
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
