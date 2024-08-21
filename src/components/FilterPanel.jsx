import React from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";
import { useAppContext } from "../context/AppProvider";

const FilterPanel = () => {
  const {
    todoList,
    searchText,
    setSearchText,
    selectedFilterId,
    setSelectedFilterId,
  } = useAppContext();
  return (
    <div className="filter-panel">
      <input
        type="text"
        name="search-text"
        placeholder="Search"
        className="filter-search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <FilterList
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
      />
      <CategoryList />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.any,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};
export default FilterPanel;
