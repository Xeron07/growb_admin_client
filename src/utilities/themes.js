const themeColors = {
  light: {
    button: {
      primary: "#473F37",
      secondary: "#756C64",
      disabled: "#DBD1C7",
    },
    text: {
      primary: "#342D26",
      secondary: "#91887F",
      disabled: "#615850",
      link: "#007562",
    },
    body: {
      primary: "#FAF0E6",
      secondary: "#C4BBB1",
    },
    modal: {
      background: "#FFF8EC",
      border: "#695C4F",
    },
  },
  dark: {
    button: {
      primary: "#2980b9",
      secondary: "#27ae60",
      disabled: "#7f8c8d",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
      link: "#3498db",
    },
    body: {
      primary: "#000000",
      secondary: "#2A272A",
    },
    modal: {
      background: "#4B4A54",
      border: "#677381",
    },
  },
};

export const getThemeColors = (theme) => themeColors[theme];
