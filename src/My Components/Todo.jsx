import React from "react";
import "../My CSS/Todo.css";

export default function Todo(props) {
  return (
    <div className="mb-3 p-3 todoBorder" key={props.index}>
      <div className="container">
        <div className="contentLayout">
          <div class="form-check itemCheckbox">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>
          <h5 className="itemText">{props.todo.desc}</h5>{" "}
          <div className="itemButtons">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                props.onDelete(props.index);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
