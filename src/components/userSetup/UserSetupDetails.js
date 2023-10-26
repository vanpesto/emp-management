import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import {
  changeStatus,
  editEmployee,
} from "../../redux-toolkit/reducers/employeeReducer";
import { validateName } from "../../utils/commonUtils";

function UserSetupDetails({ employee }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [role, setRole] = useState(employee.role);
  const [error, setError] = useState("");

  const onSave = () => {
    if (!validateName(firstName)) {
      setError("Invalid first name");
      return;
    }
    if (!validateName(lastName)) {
      setError("Invalid last name");
      return;
    }
    dispatch(
      editEmployee({
        id: employee.id,
        firstName,
        lastName,
        role,
      })
    );
  };

  return (
    <div className="user-setup-details user-setup-column">
      <h1 className="user-setup-details-title">Details</h1>
      <div className="user-setup-details-status">
        <Switch
          onChange={() =>
            dispatch(
              changeStatus({
                id: employee.id,
                status: employee.status === "active" ? "inactive" : "active",
              })
            )
          }
          checked={employee.status === "active"}
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
        <p
          className={`user-setup-details-status-text ${
            employee.status === "inactive" && "disabled"
          }`}
        >
          The user is <span>{employee.status}</span>
        </p>
      </div>
      <div className="user-details-form">
        <p
          className={`validation message ${
            employee.status === "inactive" && "disabled"
          }`}
        ></p>
        {error && (
          <p className={`invite-modal-form-validation-msg msg-error`}>
            {error}
          </p>
        )}
        <div className="invite-modal-form-row user-setup-details-form-row">
          <div className="input-container user-details-input-container">
            <input
              id="firstName"
              className={`invite-modal-form-input user-setup-details-input ${
                firstName ? "filled" : ""
              } ${employee.status === "inactive" && "disabled"}`}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.trim())}
              disabled={employee.status === "inactive"}
            />
            <label
              className={`${employee.status === "inactive" && "disabled"}`}
              htmlFor="firstName"
            >
              *First Name
            </label>
          </div>
          <div className="invite-modal-form-row user-setup-details-form-row">
            <div className="input-container user-details-input-container">
              <input
                id="lastName"
                className={`invite-modal-form-input user-setup-details-input ${
                  lastName ? "filled" : ""
                } ${employee.status === "inactive" && "disabled"}`}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value.trim())}
                disabled={employee.status === "inactive"}
              />
              <label
                className={`${employee.status === "inactive" && "disabled"}`}
                htmlFor="lastName"
              >
                *Last Name
              </label>
            </div>
          </div>
          <div className="invite-modal-form-row user-setup-details-form-row">
            <select
              id="role"
              name="role"
              className={`invite-modal-form-input user-setup-details-select ${
                role ? "filled" : ""
              }`}
              onChange={(e) => setRole(e.target.value)}
              value={role}
              disabled={employee.status === "inactive"}
            >
              <option
                value="admin"
                className={`${employee.status === "inactive" && "disabled"}`}
              >
                Admin
              </option>
              <option
                value="user"
                className={`${employee.status === "inactive" && "disabled"}`}
              >
                User
              </option>
            </select>
            <label
              className={`${employee.status === "inactive" && "disabled"}`}
              htmlFor="role"
            >
              *Role
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={() => onSave()}
        className={`${
          employee.status === "inactive" && "btn-disabled"
        } user-setup-btn user-setup-details-btn`}
        disabled={employee.status === "inactive"}
      >
        Save Changes
      </button>
    </div>
  );
}

export default UserSetupDetails;
