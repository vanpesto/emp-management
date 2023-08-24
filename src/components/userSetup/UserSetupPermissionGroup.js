import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePermissionGroupStatus } from "../../redux-toolkit/reducers/employeeReducer";
import UserSetupPermission from "./UserSetupPermission";
import Switch from "react-switch";
import { MdArrowDropDown } from "react-icons/md";

function UserSetupPermissionGroup({ group, empId }) {
  const dispatch = useDispatch();
  const [showPermissions, setShowPermissions] = useState(false);
  return (
    <div className="permission-group-container">
      <div
        className={`permission-group ${showPermissions && "group-open"}
        }`}
      >
        <div className="permission-group-btn">
          <button onClick={() => setShowPermissions(!showPermissions)}>
            <MdArrowDropDown />
          </button>
          <p className="permission-group-name">{group.name}</p>
        </div>
        <Switch
          onChange={() =>
            dispatch(
              changePermissionGroupStatus({
                id: empId,
                groupName: group.name,
              })
            )
          }
          checked={group.state === "active"}
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
      {showPermissions &&
        group.permissions.map((permission) => {
          return (
            <UserSetupPermission
              permission={permission}
              empId={empId}
              groupName={group.name}
            />
          );
        })}
    </div>
  );
}

export default UserSetupPermissionGroup;
