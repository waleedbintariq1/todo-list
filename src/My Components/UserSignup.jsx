import React from "react";

export default function UserSignup(props) {
  return (
    <div className=" container loginContainer">
      <h1 className="text-center">Signup</h1>

      <form className="p-5">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            // value={this.state.student.name}
            // onChange={this.handleChange.bind(this)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            // value={this.state.student.name}
            // onChange={this.handleChange.bind(this)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">
            Email Address
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
            // value={this.state.student.name}
            // onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            // onChange={(e) =>
            //   this.setState((prev) => ({
            //     student: {
            //       ...prev.student,
            //       dob: e.target.valueAsDate,
            //     },
            //   }))
            // }
          />
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Signup
        </button>

        <div
          className="mt-5 myLink"
          onClick={() => {
            props.changeControl();
          }}
        >
          Not already a user?
        </div>
      </form>
    </div>
  );
}
