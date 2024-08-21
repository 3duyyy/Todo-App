import { useMemo, useRef } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { useAppContext } from "./context/AppProvider";

function App() {
  const inputRef = useRef();
  const {
    selectedCategoryId,
    todoList,
    setTodoList,
    searchText,
    selectedFilterId,
    showSideBar,
    handleCompleteCheckbox,
    handleTodoItemClick,
  } = useAppContext();

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }

      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false;
      }

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
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  return (
    <div className="container">
      <FilterPanel />
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
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          {filteredTodos.map((todo) => {
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
          })}
        </div>
        {showSideBar && <Sidebar />}
      </div>
    </div>
  );
}

export default App;
