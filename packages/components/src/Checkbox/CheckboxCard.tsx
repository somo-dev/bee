import React from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "./Checkbox.types";
import { cn } from "../utils/cn";

interface CheckboxCardProps extends CheckboxProps {
  /**
   * Whether the card should have a border
   * @default true
   */
  withBorder?: boolean;

  /**
   * Padding inside the card
   * @default 'md'
   */
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const CheckboxCard: React.FC<CheckboxCardProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled,
  withBorder = true,
  padding = "md",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-200 cursor-pointer",
        paddingStyles[padding],
        {
          "border-2": withBorder,
          "border-gray-200 hover:border-gray-300":
            withBorder && !checked && !disabled,
          "border-blue-500 bg-blue-50": withBorder && checked && !disabled,
          "border-gray-100 bg-gray-50 cursor-not-allowed": disabled,
          "hover:bg-gray-50": !checked && !disabled && !withBorder,
          "bg-blue-50": checked && !disabled && !withBorder,
        },
        className
      )}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        label={label}
        description={description}
        disabled={disabled}
        labelPosition="right"
        {...props}
      />
    </div>
  );
};

CheckboxCard.displayName = "CheckboxCard";
