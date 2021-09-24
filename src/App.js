import React, { useState } from "react";
import TodoList from "./My Components/TodoList";

import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [todo, setTodo] = useState({
    id: 1,
    desc: "",
    date: new Date(),
  });

  return (
    <div className="container mt-5 p-3 w-50 customBorder">
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add Todo
      </button>

      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Add Todo</h5>
              <button className="btn-close" data-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTodoList((prevList) => [...prevList, todo]);
                  console.log(todo);
                }}
              >
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="todo"
                    placeholder="Enter todo"
                    onChange={(e) => {
                      setTodo((prevState) => {
                        desc: "lol";
                      });
                    }}
                  />
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-outline-primary mt-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <TodoList todoList={todoList}></TodoList>
    </div>
  );
}

export default App;
