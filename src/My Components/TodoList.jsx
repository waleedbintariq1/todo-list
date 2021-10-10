import React from "react";

import "../My CSS/TodoList.css";

import Todo from "./Todo";

export default function TodoList(props) {
  const todoList = props.todoList;

  return (
    <div className="mt-5">
      <ul>
        {todoList.map((todo, index) => {
          return (
            <Todo
              todo={todo}
              index={index}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
}
