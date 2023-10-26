import React from "react";
import Switch from "react-switch";
import { BsDot } from "react-icons/bs";
import { changePermissionStatus } from "../../redux-toolkit/reducers/employeeReducer";
import { useDispatch } from "react-redux";

function UserSetupPermission({ permission, empId, groupName }) {
  const dispatch = useDispatch();
  return (
    <div className="user-setup-single-permission">
      <div className="user-setup-single-permission-box">
        <BsDot className={`dot-${permission.state}`} />
        <p className="user-setup-single-permission-name">{permission.name}</p>
      </div>
      <Switch
        onChange={() =>
          dispatch(
            changePermissionStatus({
              id: empId,
              groupName,
              permission: permission,
            })
          )
        }
        checked={permission.state === "active"}
        onColor="#b1d4e7"
        offColor="#f89797"
        onHandleColor="#44a0d3"
        offHandleColor="#ff0000"
        checkedIcon={false}
        uncheckedIcon={false}
        height={13}
        width={40}
        handleDiameter={22}
      />
    </div>
  );
}

export default UserSetupPermission;
