import React from "react";

import "../assets/styles/DropDown.css";
// ** ==>
function DropDown({ name }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle drop_down_style w-100 title_second"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        name
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">
          Action
        </a>
        <a className="dropdown-item" href="#">
          Another action
        </a>
        <a className="dropdown-item" href="#">
          Something else here
        </a>
      </div>
    </div>
  );
}

export default DropDown;
