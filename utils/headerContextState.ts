let activeHeaderButton = '';

export const setActiveButton = (buttonName) => {
  console.log("Setting active header button to: ", buttonName);
  activeHeaderButton = buttonName;
};

export const getActiveButton = () => {
  return activeHeaderButton;
};