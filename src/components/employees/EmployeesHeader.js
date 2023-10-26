import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { useLocation } from "react-router";
import AddButton from "../common/AddButton";
import CustomModal from "../modals/CustomModal";
import InviteUserForm from "./InviteUserForm";

/**
 *
 * @param {component} additional represents additional block of jsx or a dynamicly set component
 */
function EmployeesHeader({ additional, title }) {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const location = useLocation();
  const renderIcon = () => {
    return (
      <div className="user-setup-icon">
        <IoMdSettings />
      </div>
    );
  };
  return (
    <div className="emp-header">
      <div className="emp-header-btn">
        {location.pathname === "/userSetup" ? (
          renderIcon()
        ) : (
          <AddButton setInviteModalVisible={setInviteModalVisible} />
        )}
      </div>
      <h1 className="emp-header-title">{title}</h1>
      {additional && <>{additional}</>}
      {inviteModalVisible && (
        <CustomModal
          setIsModalVisible={setInviteModalVisible}
          content={
            <InviteUserForm setInviteModalVisible={setInviteModalVisible} />
          }
          title="Invite New User"
        />
      )}
    </div>
  );
}

export default EmployeesHeader;
