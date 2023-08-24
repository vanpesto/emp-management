import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../components/AddButton";
import EmployeeFilter from "../components/EmployeeFilter";
import EmployeesHeader from "../components/EmployeesHeader";
import EmployeesTable from "../components/EmployeesTable";

function Employees() {
  const data = useSelector((state) => state.employee.data);
  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);
  return (
    <div className="emp-container">
      <EmployeesHeader
        additional={
          <EmployeeFilter data={data} setCurrentData={setCurrentData} />
        }
        title="Project Access"
      />
      <EmployeesTable data={currentData} />
    </div>
  );
}

export default Employees;
