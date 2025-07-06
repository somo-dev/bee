import React, { forwardRef, useRef, useEffect } from "react";
import { Check, Minus } from "lucide-react";
import { CheckboxProps } from "./Checkbox.types";
import {
  checkboxVariants,
  checkboxSizes,
  baseCheckboxStyles,
  labelStyles,
  descriptionStyles,
  errorStyles,
  iconAnimationStyles,
  indeterminateAnimationStyles,
  bounceAnimationStyles,
  checkboxAnimations,
} from "./Checkbox.styles";
import { cn } from "../../utils/cn";

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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      onChange,
      label,
      description,
      error,
      size = "md",
      variant = "default",
      color,
      radius,
      disabled = false,
      required = false,
      labelPosition = "right",
      icon,
      indeterminateIcon,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const checkboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = event.target.checked;
      onChange?.(newChecked);

      // Add bounce animation
      if (checkboxRef.current) {
        checkboxRef.current.style.animation = "none";
        checkboxRef.current.offsetHeight; // Trigger reflow
        checkboxRef.current.style.animation = "checkboxBounce 0.6s ease-in-out";
      }
    };

    // Generate custom styles when color prop is provided
    const getCustomStyles = (): React.CSSProperties => {
      if (!color) return {};

      const hoverColor = darkenColor(color, 20);
      const focusRingColor = addOpacity(color, 0.2);

      const baseCustomStyles: React.CSSProperties = {
        "--tw-ring-color": focusRingColor,
      };

      if (checked || indeterminate) {
        switch (variant) {
          case "default":
          case "filled":
            return {
              ...baseCustomStyles,
              backgroundColor: color,
              borderColor: color,
            };

          case "outline":
            return {
              ...baseCustomStyles,
              backgroundColor: "transparent",
              borderColor: color,
            };

          default:
            return baseCustomStyles;
        }
      }

      return baseCustomStyles;
    };

    const sizeStyles = checkboxSizes[size];
    const variantStyles = checkboxVariants[variant];

    // Determine checkbox state styles
    let stateStyles = variantStyles.base;
    if (disabled) {
      stateStyles = variantStyles.disabled;
    } else if (checked || indeterminate) {
      stateStyles = checked
        ? variantStyles.checked
        : variantStyles.indeterminate;
    }

    // Build checkbox classes
    const checkboxClasses = cn(
      baseCheckboxStyles,
      sizeStyles.checkbox,
      !color && stateStyles, // Only use default styles when no custom color
      {
        "border-red-500 ring-2 ring-red-500 ring-opacity-20":
          error && !disabled,
      }
    );

    // Render the icon
    const renderIcon = () => {
      if (indeterminate) {
        const IndeterminateIcon = indeterminateIcon || (
          <Minus className={cn(sizeStyles.icon, "text-white")} />
        );
        return (
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              indeterminateAnimationStyles
            )}
            style={{ animation: "checkboxIndeterminate 0.2s ease-in-out" }}
          >
            {IndeterminateIcon}
          </span>
        );
      }

      if (checked) {
        const CheckIcon = icon || (
          <Check className={cn(sizeStyles.icon, "text-white")} />
        );
        return (
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              iconAnimationStyles
            )}
            style={{ animation: "checkboxCheck 0.2s ease-in-out" }}
          >
            {CheckIcon}
          </span>
        );
      }

      return null;
    };

    // Render label content
    const renderLabelContent = () => {
      if (!label && !description) return null;

      return (
        <div className="flex-1 min-w-0">
          {label && (
            <div
              className={cn(labelStyles, sizeStyles.label, {
                "text-gray-400": disabled,
                "text-red-900": error && !disabled,
              })}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}
          {description && (
            <div
              className={cn(descriptionStyles, sizeStyles.description, {
                "text-gray-400": disabled,
                "text-red-700": error && !disabled,
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

    const labelContent = renderLabelContent();
    const hasLabel = label || description;

    const checkboxElement = (
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
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="sr-only"
          {...props}
        />
        <div
          ref={checkboxRef}
          className={checkboxClasses}
          style={combinedStyles}
          onMouseEnter={(e) => {
            if (color && !disabled && (checked || indeterminate)) {
              const target = e.currentTarget;
              const hoverColor = darkenColor(color, 20);
              target.style.backgroundColor = hoverColor;
              target.style.borderColor = hoverColor;
            }
          }}
          onMouseLeave={(e) => {
            if (color && !disabled && (checked || indeterminate)) {
              const target = e.currentTarget;
              target.style.backgroundColor = color;
              target.style.borderColor = color;
            }
          }}
        >
          {renderIcon()}
        </div>
      </div>
    );

    if (!hasLabel) {
      return (
        <div className={className}>
          {checkboxElement}
          <style jsx>{`
            ${checkboxAnimations}
          `}</style>
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
            "cursor-not-allowed": disabled,
          },
          className
        )}
      >
        {checkboxElement}
        {labelContent}

        {/* Error message */}
        {error && (
          <div className={cn(errorStyles, sizeStyles.description)}>{error}</div>
        )}

        <style jsx>{`
          ${checkboxAnimations}
        `}</style>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
