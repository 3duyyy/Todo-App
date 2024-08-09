import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Học bài",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 2,
      name: "Đi học võ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 3,
      name: "Đi đá bóng",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 4,
      name: "Đi chơi",
      isImportant: false,
      isCompleted: true,
      isDeleted: true,
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");

  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const [showSideBar, setShowSideBar] = useState(false);

  const inputRef = useRef();

  console.log({ inputRef });

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

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

  const filteredTodos = todoList
    .filter((todo) => {
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    })
    .map((todo) => {
      return (
        <TodoItem
          id={todo.id}
          name={todo.name}
          key={todo.id}
          isImportant={todo.isImportant}
          isCompleted={todo.isCompleted}
          handleTodoItemClick={handleTodoItemClick}
          handleCompleteCheckboxChange={handleCompleteCheckbox}
        />
      );
    });
  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-tag"
          placeholder="Add new tag"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isImportant: false,
                  isCompleted: false,
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>{filteredTodos}</div>
        {showSideBar && (
          <Sidebar
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSideBar={setShowSideBar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
