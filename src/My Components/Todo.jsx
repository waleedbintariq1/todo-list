import React from "react";
import "../My CSS/Todo.css";

export default function Todo(props) {
  const index = props.index;

  const handleDelete = (params) => {};

  return (
    <div className="mb-3 p-3 todoBorder">
      <div className="container">
        <div className="contentLayout">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>
          <h4>{props.todo.desc}</h4>{" "}
        </div>

        <div className="buttonLayout">
          <button className="btn btn-outline-primary" onClick={handleDelete}>
            Edit
          </button>
          <button className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}
