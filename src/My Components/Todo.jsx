import React from "react";
import "../My CSS/Todo.css";

export default function Todo(props) {
  const { todo, index } = props;

  return (
    <div className="mb-3 p-3 todoBorder" key={index}>
      <div className="container">
        <div className="contentOuterLayout">
          <div className="contentInnerLayout">
            <h5 className="itemText">{todo.desc}</h5>
            <h5>{todo.createdAt}</h5>
          </div>

          <div className="itemButtons">
            <button
              className="btn btn-outline-primary"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => {
                props.onEdit(index);
              }}
            >
              E
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                props.onDelete(todo.id);
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
