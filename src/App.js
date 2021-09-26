import React, { useState } from "react";
import TodoList from "./My Components/TodoList";

import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [todo, setTodo] = useState({
    checkBoxState: false,
    desc: "",
    date: new Date().toString(),
  });

  const handleDelete = (index) => {
    console.log("handling delete...");
    setTodo({});
    todoList.splice(index, 1);
    setTodoList(todoList);
    console.log(todoList);
  };

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

                  // clearing todo so that next todo can be added
                  setTodo({ ...todo, desc: "" });
                }}
              >
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="todo"
                    placeholder="Enter todo"
                    // setting value to todo.desc so that on submit we can clear the value
                    // thus, the input field will be cleared so that next value can be entered
                    value={todo.desc}
                    onChange={(e) => {
                      // our value in this case is an object
                      // that's why we use curly braces
                      setTodo({ ...todo, desc: e.target.value });
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

      <TodoList todoList={todoList} onDelete={handleDelete}></TodoList>
    </div>
  );
}

export default App;
