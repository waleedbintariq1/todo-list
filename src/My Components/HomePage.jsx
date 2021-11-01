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
          if (res.status === 200) {
            axiosGetTodos()
              .then((res) => {
                console.log(res.data);
                setTodoList(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            console.log("token is no longer valid");
            history.push("/");
          }
        });
    } else {
      console.log("token is null");
      history.push("/");
    }

    // return function cleanup() {
    //   localStorage.clear();
    //   console.log("good bye home page!");
    // };
  }, []);

  const handleDelete = (id) => {
    axiosDeleteTodo(id)
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (todo) => {
    axiosAddTodo({ ...todo })
      .then((res) => setTodoList((prevList) => [...prevList, res.data]))
      .catch((err) => console.error());

    // clearing todo so that next todo can be added
    setTodo({ ...todo, description: "" });
  };

  const handleType = (value) => {
    // our value in this case is an object
    // that's why we use curly braces
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

    axiosEditTodo(updatedTodo, editIndex)
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));

    // clearing todo so that next todo can be added
    setTodo({ ...todo, description: "" });
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
