import React from "react";
import "./Nav.css";
const Nav = () => {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <h3>Task Manager</h3>
          </div>
          <div className="change-background">
            <button>Change Background</button>
          </div>
          <div className="profile">
            <img src="https://picsum.photos/200/300" alt="profile" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;