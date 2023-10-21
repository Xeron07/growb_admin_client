import React from "react";
import { useColors } from "../hooks/useColors"; // Import your useColors hook
import { ClassNames } from "../utilities/util";

interface TextProps {
  content: string;
  type?: string;
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // Add more sizes as needed
  weight?: "bold" | "medium" | "strong" | "normal"; // Add more weights as needed
  classNames?: string; // Additional CSS classes
}

const Text: React.FC<TextProps> = ({
  content,
  onClick,
  size = "md",
  type = "primary",
  weight = "normal",
  classNames = "",
}) => {
  const { text } = useColors(); // Use the useColors hook to get theme colors

  const getTextSizeClasses = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      // Add more size cases as needed
      default:
        return "text-base"; // Default to 'md'
    }
  };

  const getFontWeightClasses = () => {
    switch (weight) {
      case "strong":
        return "font-bold";
      case "medium":
        return "font-medium";
      case "bold":
        return "font-semibold";
      case "normal":
        return "font-normal";
      // Add more weight cases as needed
      default:
        return "font-normal"; // Default to 'normal'
    }
  };

  return (
    <span
      className={ClassNames(
        getTextSizeClasses(),
        getFontWeightClasses(),
        classNames
      )}
      onClick={onClick}
      style={{ color: text[type] }}>
      {content}
    </span>
  );
};

export default Text;
