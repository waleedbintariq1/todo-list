import React, { useState } from "react";

import "../My CSS/TodoList.css";

import Todo from "./Todo";

export default function TodoList(props) {
  return (
    <div className="mt-5">
      <ul>
        {props.todoList.map((todo) => {
          return <Todo todo={todo} />;
        })}
      </ul>
    </div>
  );
}
