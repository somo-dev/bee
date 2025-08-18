import React, { forwardRef, useRef } from "react";
import { RadioProps } from "./Radio.types";
import {
  baseRadioStyles,
  radioSizes,
  radioVariants,
  labelStyles,
  descriptionStyles,
  requiredIndicatorStyles,
  checkedDotStyles,
  checkAnimation,
  uncheckAnimation,
} from "./Radio.styles";
import { cn } from "../utils/cn";
import { useRadioGroup } from "./RadioGroup";

// Helper function to darken a color
const darkenColor = (color: string, amount: number = 20): string => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const num = parseInt(hex, 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
    const b = Math.max(0, (num & 0x0000ff) - amount);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }
  return color;
};

// Helper function to add opacity to a color
const addOpacity = (color: string, opacity: number): string => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      onChange,
      label,
      description,
      error,
      size = "md",
      variant = "filled",
      color,
      dotColor,
      radius,
      disabled = false,
      required = false,
      labelPosition = "right",
      value,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const radioRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Check if this radio is within a RadioGroup context
    let radioGroup;
    try {
      radioGroup = useRadioGroup();
    } catch {
      // Radio is not in a group context
      radioGroup = null;
    }

    // Determine if this radio is controlled by RadioGroup
    const isInGroup = !!radioGroup;
    const groupValue = radioGroup?.value;
    const groupOnChange = radioGroup?.onChange;
    const groupSize = radioGroup?.size;
    const groupVariant = radioGroup?.variant;
    const groupDisabled = radioGroup?.disabled;
    const groupName = radioGroup?.name;

    // Use group values if available, otherwise use props
    const finalSize = groupSize || size;
    const finalVariant = groupVariant || variant;
    const finalDisabled = groupDisabled !== undefined ? groupDisabled : disabled;
    const finalName = groupName || props.name;

    // Determine if this radio is checked
    const isChecked = isInGroup ? groupValue === value : checked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (finalDisabled) return;

      if (isInGroup && groupOnChange && value !== undefined) {
        // When in RadioGroup, call with the value
        groupOnChange(value);
      } else {
        // When standalone, call with boolean
        onChange?.(event.target.checked);
      }

      // Add bounce animation
      if (radioRef.current) {
        radioRef.current.style.animation = "none";
        radioRef.current.offsetHeight; // Trigger reflow
        radioRef.current.style.animation = "radioBounce 0.6s ease-in-out";
      }
    };

    // Generate custom styles when color prop is provided
    const getCustomStyles = (): React.CSSProperties => {
      if (!color) return {};

      const hoverColor = darkenColor(color, 20);
      const focusRingColor = addOpacity(color, 0.2);

      const baseCustomStyles: React.CSSProperties = {
        ["--tw-ring-color" as string]: focusRingColor,
      };

      if (isChecked) {
        switch (finalVariant) {
          case "filled":
            return {
              ...baseCustomStyles,
              backgroundColor: color,
              borderColor: color,
            };

          case "outlined":
            return {
              ...baseCustomStyles,
              backgroundColor: "white",
              border: `1px solid ${color}`,
            };

          default:
            return baseCustomStyles;
        }
      }

      return baseCustomStyles;
    };

    // Generate dot color styles
    const getDotStyles = (): React.CSSProperties => {
      // For outlined variant, use the color prop for both border and dot
      if (finalVariant === "outlined" && color && isChecked) {
        return {
          backgroundColor: color,
        };
      }

      // For filled variant or when dotColor is explicitly provided
      if (dotColor) {
        return {
          backgroundColor: dotColor,
        };
      }

      // Default dot color for outlined variant when no custom color is provided
      if (finalVariant === "outlined" && !color && isChecked) {
        return {
          backgroundColor: "#3B82F6", // Blue color
        };
      }

      return {};
    };

    const sizeStyles = radioSizes[finalSize];
    const variantStyles = radioVariants[finalVariant];

    // Determine radio state styles
    let stateStyles = variantStyles.base;
    if (finalDisabled) {
      stateStyles = variantStyles.disabled;
    } else if (isChecked) {
      stateStyles = variantStyles.checked;
    }

    // Build radio classes
    const radioClasses = cn(
      baseRadioStyles,
      sizeStyles.radio,
      !color && stateStyles, // Only use default styles when no custom color
      {
        "border-red-500 ring-2 ring-red-500 ring-opacity-20":
          error && !finalDisabled,
        "cursor-not-allowed": finalDisabled,
      }
    );

    // Build dot classes
    const dotClasses = cn(variantStyles.dot, sizeStyles.dot, {
      [checkedDotStyles]: isChecked,
      [checkAnimation]: isChecked,
      [uncheckAnimation]: !isChecked,
    });

    // Render label content
    const renderLabelContent = () => {
      if (!label && !description) return null;

      return (
        <div className="flex-1 min-w-0">
          {label && (
            <div
              className={cn(labelStyles, sizeStyles.label, {
                "text-gray-400": finalDisabled,
                "text-red-900": error && !finalDisabled,
                // Center align when no description
                "flex items-center": !description,
              })}
            >
              {label}
              {required && <span className={requiredIndicatorStyles}>*</span>}
            </div>
          )}
          {description && (
            <div
              className={cn(descriptionStyles, sizeStyles.description, {
                "text-gray-400": finalDisabled,
                "text-red-700": error && !finalDisabled,
              })}
            >
              {description}
            </div>
          )}
        </div>
      );
    };

    // Combine all styles
    const combinedStyles: React.CSSProperties = {
      ...getCustomStyles(),
      borderRadius: radius ? `${radius}px` : undefined,
      ...style,
    };

    const dotStyles: React.CSSProperties = {
      ...getDotStyles(),
    };

    const labelContent = renderLabelContent();
    const hasLabel = label || description;

    const radioElement = (
      <div className="relative">
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="radio"
          checked={isChecked}
          onChange={handleChange}
          disabled={finalDisabled}
          required={required}
          value={value}
          className="sr-only"
          {...props}
        />
        <div
          ref={radioRef}
          className={radioClasses}
          style={combinedStyles}
          onMouseEnter={(e) => {
            if (color && !finalDisabled && isChecked) {
              const target = e.currentTarget;
              const hoverColor = darkenColor(color, 20);
              if (finalVariant === "filled") {
                target.style.backgroundColor = hoverColor;
                target.style.borderColor = hoverColor;
              } else {
                target.style.borderColor = hoverColor;
              }
            }
          }}
          onMouseLeave={(e) => {
            if (color && !finalDisabled && isChecked) {
              const target = e.currentTarget;
              if (finalVariant === "filled") {
                target.style.backgroundColor = color;
                target.style.borderColor = color;
              } else {
                target.style.borderColor = color;
              }
            }
          }}
        >
          <div className={dotClasses} style={dotStyles} />
        </div>
      </div>
    );

    if (!hasLabel) {
      return (
        <div className={className}>
          {radioElement}
        </div>
      );
    }

    return (
      <label
        className={cn(
          "flex items-start cursor-pointer group",
          sizeStyles.gap,
          {
            "flex-row-reverse justify-end": labelPosition === "left",
            "cursor-pointer": !finalDisabled,
            "cursor-not-allowed": finalDisabled,
          },
          className
        )}
      >
        {radioElement}
        {labelContent}

        {/* Error message */}
        {error && (
          <div
            className={cn("text-red-600 text-sm mt-1", sizeStyles.description)}
          >
            {error}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";
