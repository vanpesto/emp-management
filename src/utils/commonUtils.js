/**
 * validate name
 * @param {string} name the provided name for validation
 * @returns {boolean} if the name is valid or not
 */
export const validateName = (name) => {
  const nameRegex = new RegExp("^[a-zA-Z]+$");
  if (nameRegex.test(name)) {
    return true;
  }
  return false;
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
