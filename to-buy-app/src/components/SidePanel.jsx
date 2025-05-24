import logo from "../assets/logo.svg";
import { useState } from "react";

export default function SidePanel() {
  const [expanded, setExpanded] = useState(false);

  function toggleSidebar() {
    setExpanded((prev) => !prev);
  }

  const asideClasses = expanded ? "side-panel expanded" : "side-panel";

  return (
    <aside className={asideClasses}>
      <header>
        <div className="logo">
          <img src={logo} width="40" /> To Buy
        </div>
        <button className="btn" type="button">
          New List
        </button>
      </header>
      <div className="buy-lists-container">
        <ul className="card-list">
          <li className="card-list-item">
            <span className="card-text">Grocery List</span>
            <span className="tag">3 / 5</span>
            <span className="tag">2025-06-25</span>
            <button className="icon-btn" type="button">
              X
            </button>
          </li>
          <li className="card-list-item">Grocery List</li>
          <li className="card-list-item">Grocery List</li>
        </ul>
      </div>
      <button
        className="side-panel-expand-btn"
        type="button"
        onClick={toggleSidebar}
      >
        {expanded ? "<-" : "->"}
      </button>
    </aside>
  );
}
