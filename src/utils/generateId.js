// utils/generateId.js
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};