import React, { createContext, useContext } from "react";
import { CheckboxGroupProps } from "./Checkbox.types";
import {
  groupStyles,
  groupLabelStyles,
  groupDescriptionStyles,
  groupErrorStyles,
  groupSpacing,
} from "./Checkbox.styles";
import { cn } from "../../utils/cn";

interface CheckboxGroupContextValue {
  value: string[];
  onChange: (value: string[]) => void;
  size?: CheckboxGroupProps["size"];
  variant?: CheckboxGroupProps["variant"];
  disabled?: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null
);

export const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error("useCheckboxGroup must be used within a CheckboxGroup");
  }
  return context;
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value = [],
  onChange,
  children,
  label,
  description,
  error,
  required = false,
  size = "md",
  variant = "default",
  disabled = false,
  orientation = "vertical",
  spacing = "md",
  className,
  ...props
}) => {
  const handleChange = (newValue: string[]) => {
    onChange?.(newValue);
  };

  const contextValue: CheckboxGroupContextValue = {
    value,
    onChange: handleChange,
    size,
    variant,
    disabled,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn(groupStyles, className)} {...props}>
        {/* Group Label */}
        {label && (
          <div className={groupLabelStyles}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
        )}

        {/* Group Description */}
        {description && (
          <div className={groupDescriptionStyles}>{description}</div>
        )}

        {/* Checkboxes */}
        <div
          className={cn(
            orientation === "horizontal" ? "flex flex-wrap" : "flex flex-col",
            groupSpacing[spacing]
          )}
        >
          {children}
        </div>

        {/* Group Error */}
        {error && <div className={groupErrorStyles}>{error}</div>}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";
