import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import EmployeesHeader from "../components/employees/EmployeesHeader";
import UserSetupProfile from "../components/userSetup/UserSetupProfile";
import UserSetupDetails from "../components/userSetup/UserSetupDetails";
import { useSelector } from "react-redux";
import UserSetupPermissions from "../components/userSetup/UserSetupPermissions";

function UserSetup() {
  const location = useLocation();
  const propsData = location.state;

  const data = useSelector((state) => state.employee.data);

  const [employee, setEmployee] = useState(propsData);

  useEffect(() => {
    if (data) {
      setEmployee(data.find((emp) => emp.id === employee.id));
    }
  }, [data]);

  return (
    <div className="user-setup">
      <EmployeesHeader title="User Setup" />
      <div className="user-setup-container">
        <UserSetupProfile employee={employee} />
        <UserSetupDetails employee={employee} />
        <UserSetupPermissions employee={employee} />
      </div>
    </div>
  );
}

export default UserSetup;
