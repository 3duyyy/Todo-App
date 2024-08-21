import React, { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { CATEGORY_ITEMS } from "./constants";
import { useAppContext } from "../context/AppProvider";

const Sidebar = () => {
  const { activeTodoItem, handleTodoItemChange, setShowSideBar } =
    useAppContext();
  const data = activeTodoItem;
  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [category, setCategory] = useState(data.category);

  const handleSave = () => {
    const newTodo = { ...data, name, isImportant, isCompleted, category };
    handleTodoItemChange(newTodo);
    setShowSideBar(false);
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
          <label htmlFor="sb-important" style={{ userSelect: "none" }}>
            Is Important
          </label>
          <input
            type="checkbox"
            name="important"
            id="sb-important"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div
          className="sb-form-field"
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <label htmlFor="sb-completed" style={{ userSelect: "none" }}>
            Is Completed
          </label>
          <input
            type="checkbox"
            name="completed"
            id="sb-completed"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-category">Category</label>
          <select
            id="sb-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {CATEGORY_ITEMS.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setShowSideBar(false)}>Cancel</button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  todoItem: PropTypes.shape({
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    category: PropTypes.string,
  }),
  handleTodoItemChange: PropTypes.func,
  setShowSideBar: PropTypes.func,
};

export default Sidebar;
