import React, { createContext, useContext } from "react";
import { RadioGroupProps } from "./Radio.types";
import {
  groupStyles,
  groupLabelStyles,
  groupDescriptionStyles,
  groupErrorStyles,
  groupSpacing,
  requiredIndicatorStyles,
} from "./Radio.styles";
import { cn } from "../../utils/cn";

interface RadioGroupContextValue {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  size?: RadioGroupProps["size"];
  variant?: RadioGroupProps["variant"];
  disabled?: boolean;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("useRadioGroup must be used within a RadioGroup");
  }
  return context;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
  label,
  description,
  error,
  required = false,
  size = "md",
  variant = "filled",
  disabled = false,
  orientation = "vertical",
  spacing = "md",
  name,
  className,
  ...props
}) => {
  const handleChange = (newValue: string | number) => {
    onChange?.(newValue);
  };

  const contextValue: RadioGroupContextValue = {
    value,
    onChange: handleChange,
    size,
    variant,
    disabled,
    name,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={cn(groupStyles, className)} role="radiogroup" {...props}>
        {/* Group Label */}
        {label && (
          <div className={groupLabelStyles}>
            {label}
            {required && <span className={requiredIndicatorStyles}>*</span>}
          </div>
        )}

        {/* Group Description */}
        {description && (
          <div className={groupDescriptionStyles}>{description}</div>
        )}

        {/* Radio Buttons */}
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
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = "RadioGroup";
