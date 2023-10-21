import React from "react";
import { useColors } from "../hooks/useColors"; // Import your useColors hook

interface ButtonProps {
  label: string;
  onClick: () => void;
  size?: "xs" | "sm" | "md";
  theme?: "light" | "dark";
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  size = "md",
  disabled = false,
  isLoading = false,
}) => {
  const { button, text } = useColors();
  const getButtonSizeClasses = () => {
    switch (size) {
      case "xs":
        return "px-2 py-1 text-xs";
      case "sm":
        return "px-3 py-1.5 text-sm";
      default:
        return "px-4 py-2 text-base";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${
        isLoading ? `cursor-not-allowed` : `cursor-pointer`
      } text-white ${getButtonSizeClasses()} rounded focus:outline-none ${
        disabled || isLoading
          ? "opacity-50 pointer-events-none"
          : "hover:bg-opacity-80"
      }`}
      style={{
        backgroundColor: isLoading ? button.disabled : button.primary,
        color: text.primary,
      }}
      disabled={disabled || isLoading}>
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
