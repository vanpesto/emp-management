import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebounce } from "use-debounce";

function EmployeeFilter({ data, setCurrentData }) {
  const [filterValue, setFilterValue] = useState("");
  const [debounceValue] = useDebounce(filterValue, 500);

  /**
   * filter the data by name
   * @param {string} value the input value
   */
  const filterData = (value) => {
    if (value === "") {
      setCurrentData(data);
    }
    const filteredData = data.filter((employee) => {
      if (
        employee.firstName.toLowerCase().includes(value) ||
        employee.lastName.toLowerCase().includes(value)
      ) {
        return true;
      }
    });
    setCurrentData([...filteredData]);
  };

  useEffect(() => {
    filterData(debounceValue);
  }, [debounceValue]);

  return (
    <div className="emp-header-filter">
      <input
        className="emp-header-filter-input"
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value.trim())}
        placeholder="Type to filter the table"
      />
      <AiOutlineSearch className="search-icon" />
    </div>
  );
}

export default EmployeeFilter;
