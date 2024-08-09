import React from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";

const Filter_Items = [
  {
    id: "all",
    label: "All",
    iconPath: "./public/inbox.png",
  },
  {
    id: "important",
    label: "Important",
    iconPath: "./public/check.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./public/flag.png",
  },
  {
    id: "deleted",
    label: "Deleted",
    iconPath: "./public/delete.png",
  },
];

const FilterPanel = (props) => {
  return (
    <div className="filter-panel">
      <input type="text" name="search-text" placeholder="Search" />
      <div className="filter-container">
        {Filter_Items.map((filterItem) => {
          return (
            <div
              className={`filter-item ${
                filterItem.id === props.selectedFilterId ? "selected" : ""
              }`}
              key={filterItem.id}
              onClick={() => {
                props.setSelectedFilterId(filterItem.id);
              }}
            >
              <div className="filter-name">
                <img src={filterItem.iconPath} alt="" />
                <p>{filterItem.label}</p>
              </div>
              <p>22</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.any,
  setSelectedFilterId: PropTypes.func,
};
export default FilterPanel;
