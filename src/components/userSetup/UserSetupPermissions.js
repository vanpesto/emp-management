import React from "react";
import UserSetupPermissionGroup from "./UserSetupPermissionGroup";
import Switch from "react-switch";
import { changeSuperAdminState } from "../../redux-toolkit/reducers/employeeReducer";
import { useDispatch } from "react-redux";

function UserSetupPermissions({ employee }) {
  const dispatch = useDispatch();
  return (
    <div className="user-setup-permissions">
      <div className="user-setup-permissions-title">
        <h1>Permissions</h1>
        <span>{employee.role}</span>
      </div>
      <div className="user-setup-permissions-super-admin">
        <span>Super Admin</span>
        <Switch
          onChange={() =>
            dispatch(
              changeSuperAdminState({
                id: employee.id,
                superAdmin: employee.superAdmin,
              })
            )
          }
          checked={employee.superAdmin === "active"}
          onColor="#b1d4e7"
          offColor="#f89797"
          onHandleColor="#44a0d3"
          offHandleColor="#ff0000"
          checkedIcon=""
          uncheckedIcon=""
          height={13}
          width={40}
          handleDiameter={22}
        />
      </div>
      <div className="user-setup-group-container">
        {employee.permissionGroups.map((group) => {
          return <UserSetupPermissionGroup group={group} empId={employee.id} />;
        })}
      </div>
    </div>
  );
}

export default UserSetupPermissions;
