import React, { useRef, useEffect } from "react";

function CustomModal({ content, setIsModalVisible, title }) {
  const wrapperRef = useRef(null);

  /**
   * Hook that handle clicks outside of the passed ref
   */
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsModalVisible(false);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
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
