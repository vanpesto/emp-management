import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  sortByName,
  sortByRole,
  sortByStatus,
} from "../../redux-toolkit/reducers/employeeReducer";
import ReactPaginate from "react-paginate";

function EmployeesTable({ data }) {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState();
  const [currentData, setCurrentData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    paginatedItems(itemsPerPage);
  }, [itemOffset, itemsPerPage, data]);

  function paginatedItems(itemsPerPage) {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentData(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="emp-table">
      <div className="emp-table-header">
        <div className="emp-table-header-columns user-column">
          <span>User</span>
          <button onClick={() => dispatch(sortByName())}>
            <MdArrowDropDown className="dropdown-arrow" />
          </button>
        </div>
        <div className="emp-table-header-columns">
          <span>Role</span>
          <button onClick={() => dispatch(sortByRole())}>
            <MdArrowDropDown className="dropdown-arrow" />
          </button>
        </div>
        <div className="emp-table-header-columns">
          <span>Status</span>
          <button onClick={() => dispatch(sortByStatus())}>
            <MdArrowDropDown className="dropdown-arrow" />
          </button>
        </div>
        <div className="actions-column emp-table-header-columns">
          <span>Actions</span>
        </div>
      </div>
      {currentData.map((employee) => {
        return <Employee employee={employee} />;
      })}
      <div className="pagination-container">
        <div className="pagination-records">
          <p>Records on page</p>
          <select
            className="pagination-records-select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <ReactPaginate
          className="paginate"
          pageClassName="paginate-item"
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default EmployeesTable;
