import React from "react";
import { MdVpnKey } from "react-icons/md";
import Avatar from "../../assets/images/Avatar.svg";

function UserSetupProfile({ employee }) {
  return (
    <div className="user-setup-profile user-setup-column">
      <div className="user-setup-profile-photo-container">
        <img className="user-setup-profile-photo" src={Avatar} alt="avatar" />
        <div
          className={`${
            employee.status === "inactive" && "btn-disabled"
          } admin-key user-photo-key`}
        >
          <MdVpnKey />
        </div>
      </div>
      <span className="user-setup-profile-photo-text">UPLOAD A PHOTO</span>
      <p
        className={`${
          employee.status === "inactive" && "disabled"
        } user-setup-profile-name`}
      >
        {employee.firstName}
      </p>
      <p
        className={`${
          employee.status === "inactive" && "disabled"
        } user-setup-profile-name`}
      >
        {employee.lastName}
      </p>
      <p
        className={`${
          employee.status === "inactive" && "disabled"
        } user-setup-profile-email`}
      >
        {employee.email}
      </p>
      <button
        className={`${
          employee.status === "inactive" && "btn-disabled"
        } user-setup-profile-btn user-setup-btn`}
        disabled={employee.status === "inactive"}
      >
        Resend the invite
      </button>
    </div>
  );
}

export default UserSetupProfile;
