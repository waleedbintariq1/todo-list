import React from "react";
import "../My CSS/Todo.css";

export default function Todo(props) {
  const { todo, index } = props;

  // createdAt returned from the server is a string
  // so, we first get the milliseconds using Date.parse()
  // then, we pass milliseconds to Date's constructor
  const properDate = new Date(Date.parse(todo.createdAt));

  const day = properDate.getDate();
  const month = properDate.getMonth() + 1;
  const year = properDate.getFullYear();
  let hours = properDate.getHours();
  const minutes = properDate.getMinutes();

  let amOrPm = "";

  if (hours >= 12) {
    hours -= 12;
    amOrPm = "pm";
  } else {
    amOrPm = "am";
  }

  return (
    <div className="mb-3 p-3 todoBorder" key={index}>
      <div className="container">
        <div className="contentLayout">
          <div className="textLayout">
            <h5 className="itemText">{todo.desc}</h5>

            <div className="dateAndTime">
              <div className="time">
                {hours}:{minutes} {amOrPm}
              </div>
              <div className="date">
                {day}/{month}/{year}
              </div>
            </div>
          </div>

          <div className="buttonsLayout">
            <button
              className="btn btn-outline-primary"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => {
                props.onEdit(index);
              }}
            >
              Edit
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
