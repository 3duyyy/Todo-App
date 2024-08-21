import React, { useMemo } from "react";
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

const FilterList = (props) => {
  const countByFilterType = useMemo(() => {
    return props.todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };

        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }

        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }

        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }

        return newAcc;
      },
      { all: props.todoList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [props.todoList]);

  return (
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
            <p className="filter-count">{countByFilterType[filterItem.id]}</p>
          </div>
        );
      })}
    </div>
  );
};

FilterList.propTypes = {
  selectedFilterId: PropTypes.any,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
};

export default FilterList;
