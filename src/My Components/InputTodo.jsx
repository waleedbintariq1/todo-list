import React from "react";

export default function InputTodo(props) {
  let check;
  if (props.purpose === "add") {
    check = true;
  } else {
    check = false;
  }

  return (
    <div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{check ? "Add Todo" : "Edit Todo"}</h5>
              <button className="btn-close" data-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  // var modal = document.getElementById("myModal");
                  // modal.hidden = true;

                  check ? props.onAdd(props.todo) : props.onEdit(props.todo);
                }}
              >
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="todo"
                    placeholder="Enter todo"
                    // setting value to todo.description so that on submit we can clear the value
                    // next value can then be entered
                    value={props.todo.description}
                    onChange={(e) => {
                      props.onType(e.target.value);
                    }}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-3"
                  >
                    {check ? "Add" : "Edit"}
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
