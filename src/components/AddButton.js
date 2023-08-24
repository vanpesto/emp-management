import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";

function AddButton({ setInviteModalVisible }) {
  return (
    <button className="add-btn" onClick={() => setInviteModalVisible(true)}>
      <BiPlus />
    </button>
  );
}

export default AddButton;
