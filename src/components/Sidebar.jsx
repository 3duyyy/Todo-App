import React, { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const data = props.todoItem;
  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);

  const handleSave = () => {
    const newTodo = { ...data, name, isImportant, isCompleted };
    props.handleTodoItemChange(newTodo);
    props.setShowSideBar(false);
  };

  return (
    <div className="sidebar">
      <form action="" className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo name</label>
          <input
            type="text"
            name="name"
            id="sb-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div
          className="sb-form-field"
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <label htmlFor="sb-name">Is Important</label>
          <input
            type="checkbox"
            name="name"
            id="sb-name"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div
          className="sb-form-field"
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <label htmlFor="sb-name">Is Completed</label>
          <input
            type="checkbox"
            name="name"
            id="sb-name"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => props.setShowSideBar(false)}>Cancel</button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  todoItem: PropTypes.any,
  handleTodoItemChange: PropTypes.func,
  setShowSideBar: PropTypes.func,
};

export default Sidebar;
