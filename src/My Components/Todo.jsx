import React from "react";
import "../My CSS/Todo.css";

export default function Todo(props) {
  const { id, desc, date } = props;

  return (
    <div className="mb-3 p-3 todoBorder">
      <div className="todoDetails">
        <h4>{desc}</h4>
        <div>{date}</div>
      </div>
    </div>
  );
}
