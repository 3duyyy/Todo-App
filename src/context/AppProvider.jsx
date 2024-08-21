import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Học bài",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Đi học võ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Đi đá bóng",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "4",
      name: "Đi chơi",
      isImportant: false,
      isCompleted: true,
      isDeleted: true,
      category: "travel",
    },
  ]);
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const handleCompleteCheckbox = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todoId === todo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSideBar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        activeTodoItemId,
        setActiveTodoItemId,
        showSideBar,
        setShowSideBar,
        handleCompleteCheckbox,
        handleTodoItemClick,
        handleTodoItemChange,
        activeTodoItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
