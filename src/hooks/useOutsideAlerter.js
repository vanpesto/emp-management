import { useEffect, useState } from "react";

/**
 * Hook that handle clicks outside of the passed ref
 */
export const useOutsideAlerter = (ref) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
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
  return { isModalVisible };
};
