// utils/randomColor.js
const primaryColors = ["#1E90FF", "#FF4500"]; // Add more primary colors as needed
const secondaryColors = ["#32CD32", "#FFD700"]; // Add more secondary colors as needed

export const getRandomColor = () => {
  const allColors = [...primaryColors, ...secondaryColors];
  const randomIndex = Math.floor(Math.random() * allColors.length);
  return allColors[randomIndex];
};
