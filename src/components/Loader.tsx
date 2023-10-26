import React from "react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string; // Add color prop
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "sm",
  className = "",
  color = "indigo-600", // Default color is indigo-600
}) => {
  const sizes = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizes[size]} border-t-2 border-${color} border-solid rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;
