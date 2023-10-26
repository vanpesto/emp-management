import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmployeeFilter from "../components/employees/EmployeeFilter";
import EmployeesHeader from "../components/employees/EmployeesHeader";
import EmployeesTable from "../components/employees/EmployeesTable";

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
