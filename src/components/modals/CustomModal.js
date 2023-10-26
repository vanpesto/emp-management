import React, { useRef } from "react";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";

function CustomModal({ content, setIsModalVisible, title }) {
  const wrapperRef = useRef(null);
  const { isModalVisible } = useOutsideAlerter(wrapperRef);
  setIsModalVisible(isModalVisible);

  return (
    <div className="invite-modal-container">
      <div className="invite-modal" ref={wrapperRef}>
        <h1 className="invite-modal-title">{title}</h1>
        {content}
      </div>
    </div>
  );
}

export default CustomModal;
