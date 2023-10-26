import React, { useEffect, useState } from "react";
import { MdFace, MdAlternateEmail, MdVpnKey } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux-toolkit/reducers/employeeReducer";
import { generateUniqueId, validateName } from "../../utils/commonUtils";

function InviteUserForm({ setInviteModalVisible }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState({
    type: "",
    value: "",
  });

  const data = useSelector((state) => state.employee.data);
  const dispatch = useDispatch();

  /**
   * validate email
   * @param {string} name the provided email for validation
   * @returns {boolean} if the email is valid or not
   */
  const emailValidation = (email) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const emailExists = data.find((employee) => employee.email === email);
    if (!emailRegex.test(email)) {
      setValidationMessage({ type: "error", value: "Invalid email address" });
      return false;
    }
    if (emailExists) {
      setValidationMessage({
        type: "error",
        value: "This email already exists",
      });
      return false;
    }

    return true;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!validateName(firstName)) {
      setValidationMessage({ type: "error", value: "Invalid first name" });
      return;
    }

    if (!validateName(lastName)) {
      setValidationMessage({ type: "error", value: "Invalid last name" });
      return;
    }
    if (!emailValidation(email)) {
      return;
    }
    setValidationMessage({
      type: "success",
      value: "Successfully added new user!",
    });
    dispatch(
      addUser({
        id: generateUniqueId(),
        firstName,
        lastName,
        status: "active",
        role,
        email,
        superAdmin: "active",
        permissionGroups: [
          {
            name: "Group 1",
            state: "active",
            permissions: [
              { name: "permission1", state: "active" },
              { name: "permission2", state: "inactive" },
              { name: "permission3", state: "active" },
              { name: "permission4", state: "inactive" },
              { name: "permission5", state: "active" },
            ],
          },
          {
            name: "Group 2",
            state: "inactive",
            permissions: [
              { name: "permission6", state: "inactive" },
              { name: "permission7", state: "active" },
              { name: "permission8", state: "inactive" },
              { name: "permission9", state: "active" },
              { name: "permission10", state: "inactive" },
            ],
          },
          {
            name: "Group 3",
            state: "active",
            permissions: [
              { name: "permission11", state: "active" },
              { name: "permission12", state: "inactive" },
              { name: "permission13", state: "active" },
              { name: "permission14", state: "inactive" },
              { name: "permission15", state: "active" },
            ],
          },
        ],
      })
    );
    setInviteModalVisible(false);
  };

  useEffect(() => {
    if (firstName && email && lastName && role) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [firstName, lastName, email, role]);

  return (
    <form className="invite-modal-form" onSubmit={(e) => onSubmitForm(e)}>
      <div className="invite-modal-form-row">
        <MdFace />
        <div className="input-container">
          <input
            id="firstName"
            className={`invite-modal-form-input ${firstName ? "filled" : ""}`}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.trim())}
          />
          <label htmlFor="firstName">*First Name</label>
        </div>
        <div className="input-container">
          <input
            id="lastName"
            className={`invite-modal-form-input ${lastName ? "filled" : ""}`}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.trim())}
          />
          <label htmlFor="lastName">*Last Name</label>
        </div>
      </div>
      <div className="invite-modal-form-row">
        <MdAlternateEmail />
        <div className="input-container">
          <input
            id="email"
            className={`invite-modal-form-input ${email ? "filled" : ""}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <label htmlFor="email">*Email</label>
        </div>
      </div>
      <div className="invite-modal-form-row">
        <MdVpnKey />
        <div className="input-container">
          <select
            id="role"
            name="role"
            className={`invite-modal-form-input ${role ? "filled" : ""}`}
            onChange={(e) => setRole(e.target.value)}
          >
            <option hidden selected></option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <label htmlFor="role">*Role</label>
        </div>
      </div>
      <div className="invite-modal-form-actions">
        <input
          className={`invite-modal-form-actions-btn ${
            btnDisabled && "btn-disabled"
          }`}
          type="submit"
          value="Send Invitation"
          disabled={btnDisabled}
        />
        {validationMessage?.value && (
          <p
            className={`invite-modal-form-validation-msg msg-${validationMessage.type}`}
          >
            {validationMessage.value}
          </p>
        )}
      </div>
    </form>
  );
}

export default InviteUserForm;
