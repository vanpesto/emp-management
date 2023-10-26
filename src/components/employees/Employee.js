import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdFace, MdVpnKey } from "react-icons/md";
import Switch from "react-switch";
import Avatar from "../../assets/images/Avatar.svg";
import CustomModal from "../modals/CustomModal";
import {
  changeStatus,
  deleteUser,
} from "../../redux-toolkit/reducers/employeeReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Employee({ employee }) {
  const [isModalVisibe, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    setIsModalVisible(false);
    dispatch(deleteUser(employee));
  };

  const renderUser = () => {
    return (
      <div>
        <div className="delete-user-row">
          <MdFace />
          <p className="delete-user-row-name">
            {employee.firstName} {employee.lastName}
          </p>
          <p className={`delete-user-row-status user-${employee.status}`}>
            {employee.status} User
          </p>
        </div>
        <button
          onClick={() => handleDeleteUser()}
          className="delete-user-row-btn"
        >
          Delete User
        </button>
      </div>
    );
  };
  return (
    <div className="emp-row-container">
      <img className="emp-avatar" src={Avatar} alt="React Logo" />
      <div className="emp-row">
        <div className="emp-row-creds">
          <p
            className={`${
              employee.status === "inactive" && "disabled"
            } emp-row-creds-name`}
          >
            {employee.firstName} {employee.lastName}
          </p>
          <span
            className={`${
              employee.status === "inactive" && "disabled"
            } emp-row-creds-email`}
          >
            {employee.email}
          </span>
        </div>
        <span className="emp-row-role">
          {employee.role === "admin" && (
            <div
              className={` ${
                employee.status === "inactive" && "btn-disabled"
              } admin-key emp-row-role-key`}
            >
              <MdVpnKey />
            </div>
          )}
          {employee.role}
        </span>
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
        <div className="emp-row-options">
          <Link
            to="/userSetup"
            state={employee}
            style={{
              pointerEvents: employee.status === "active" ? "" : "none",
            }}
          >
            <IoMdSettings
              className="option-icon emp-row-options-settings"
              color="#c6c6c6"
            />
          </Link>
          <button
            onClick={() => setIsModalVisible(true)}
            disabled={employee.status === "inactive"}
          >
            <FaTrash className="option-icon" color="#c6c6c6" />
          </button>
        </div>
      </div>
      {isModalVisibe && (
        <CustomModal
          title="Delete User"
          content={renderUser()}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
}

export default Employee;
