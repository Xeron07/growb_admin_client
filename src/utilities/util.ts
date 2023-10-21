// classNameUtils.ts

// Function to concatenate multiple CSS class names
export const ClassNames = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(" ");
};
