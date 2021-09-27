import React, { Component } from "react";

export default function InputTodo(props) {
  return (
    <div>
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
                  props.onAdd(props.todo);
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
                    value={props.todo.desc}
                    onChange={(e) => {
                      props.onType(e.target.value);
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
    </div>
  );
}
