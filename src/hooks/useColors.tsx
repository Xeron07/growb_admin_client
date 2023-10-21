// useColors.tsx
import { useSelector } from "react-redux";
import { getThemeColors } from "../utilities/themes";

export const useColors = () => {
  const themeStore = useSelector((state: any) => state.theme); // Replace with your actual store property
  const theme = themeStore?.color;

  return {
    button: theme
      ? getThemeColors(theme).button
      : getThemeColors("light").button,
    text: theme ? getThemeColors(theme).text : getThemeColors("light").text,
    body: theme ? getThemeColors(theme).body : getThemeColors("light").body,
    modal: theme ? getThemeColors(theme).modal : getThemeColors("light").modal,
  };
};
