import React, { forwardRef, useRef } from "react";
import { SwitchProps } from "./Switch.types";
import {
  switchStyles,
  switchSizes,
  labelStyles,
  descriptionStyles,
  errorStyles,
  requiredIndicatorStyles,
  innerLabelStyles,
  onLabelStyles,
  offLabelStyles,
  switchAnimations,
  switchBounceAnimation,
  fadeInAnimation,
} from "./Switch.styles";
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

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      label,
      description,
      error,
      size = "md",
      color,
      offColor,
      thumbColor,
      disabled = false,
      required = false,
      radius,
      labelPosition = "right",
      onLabel,
      offLabel,
      thumbIcon,
      showInnerLabels = false,
      animationDuration = 200,
      styles,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const switchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = event.target.checked;
      onChange?.(newChecked);

      // Add bounce animation
      if (switchRef.current) {
        switchRef.current.style.animation = "none";
        switchRef.current.offsetHeight; // Trigger reflow
        switchRef.current.style.animation = "switchBounce 0.6s ease-in-out";
      }
    };

    const handleSwitchClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (disabled) return;

      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    // Generate custom styles when color props are provided
    const getCustomStyles = (): React.CSSProperties => {
      const customStyles: React.CSSProperties = {
        transitionDuration: `${animationDuration}ms`,
      };

      if (checked && color) {
        customStyles.backgroundColor = color;
        customStyles.borderColor = darkenColor(color, 10);
      } else if (!checked && offColor) {
        customStyles.backgroundColor = offColor;
      }

      if (radius !== undefined) {
        customStyles.borderRadius = `${radius}px`;
      }

      return customStyles;
    };

    const getThumbStyles = (): React.CSSProperties => {
      const thumbStyles: React.CSSProperties = {
        transitionDuration: `${animationDuration}ms`,
      };

      if (thumbColor) {
        thumbStyles.backgroundColor = thumbColor;
      }

      if (radius !== undefined) {
        thumbStyles.borderRadius = `${radius}px`;
      }

      return thumbStyles;
    };

    const sizeStyles = switchSizes[size];

    // Determine track state styles
    let trackStateStyles = switchStyles.track.base;
    if (disabled) {
      trackStateStyles += ` ${switchStyles.track.disabled}`;
    } else if (checked && !color) {
      trackStateStyles += ` ${switchStyles.track.checked}`;
    }

    // Determine thumb state styles
    let thumbStateStyles = switchStyles.thumb.base;
    if (disabled) {
      thumbStateStyles += ` ${switchStyles.thumb.disabled}`;
    } else if (checked && !thumbColor) {
      thumbStateStyles += ` ${switchStyles.thumb.checked}`;
    }

    // Calculate thumb translation
    const getThumbTransform = (): string => {
      const trackWidth =
        parseInt(sizeStyles.track.split(" ")[0].replace("w-", "")) * 4; // Convert to px (w-11 = 44px)
      const thumbWidth =
        parseInt(sizeStyles.thumb.split(" ")[0].replace("w-", "")) * 4; // Convert to px
      const translateX = checked ? trackWidth - thumbWidth - 4 : 0; // 4px for padding

      return `translateX(${translateX}px)`;
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
              {required && <span className={requiredIndicatorStyles}>*</span>}
            </div>
          )}
          {description && (
            <div
              className={cn(descriptionStyles, sizeStyles.label, {
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

    const labelContent = renderLabelContent();
    const hasLabel = label || description;

    const switchElement = (
      <div className="relative" onClick={handleSwitchClick}>
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

        <span
          ref={switchRef}
          className={cn(
            trackStateStyles,
            sizeStyles.track,
            {
              "border-red-500 ring-2 ring-red-500 ring-opacity-20":
                error && !disabled,
            },
            styles?.track
          )}
          style={getCustomStyles()}
          onClick={handleSwitchClick}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          {/* Inner Labels */}
          {showInnerLabels && (
            <>
              {/* ON Label - positioned on the right side when checked */}
              {onLabel && (
                <div
                  className={cn(
                    innerLabelStyles,
                    sizeStyles.innerLabel,
                    {
                      "opacity-100 scale-100 translate-x-0": checked,
                      "opacity-0 scale-75 -translate-x-1": !checked,
                    },
                    styles?.innerLabel
                  )}
                  style={{
                    left: size === "sm" ? "6px" : size === "md" ? "8px" : size === "lg" ? "10px" : "12px",
                    right: "auto",
                  }}
                >
                  {React.cloneElement(onLabel, {
                    className: cn("w-3 h-3", onLabel.props.className),
                  })}
                </div>
              )}

              {/* OFF Label - positioned on the left side when unchecked */}
              {offLabel && (
                <div
                  className={cn(
                    innerLabelStyles,
                    sizeStyles.innerLabel,
                    {
                      "opacity-100 scale-100 translate-x-0": !checked,
                      "opacity-0 scale-75 translate-x-1": checked,
                    },
                    styles?.innerLabel
                  )}
                  style={{
                    right: size === "sm" ? "6px" : size === "md" ? "8px" : size === "lg" ? "10px" : "12px",
                    left: "auto",
                  }}
                >
                  {React.cloneElement(offLabel, {
                    className: cn("w-3 h-3", offLabel.props.className),
                  })}
                </div>
              )}
            </>
          )}

          {/* Thumb */}
          <span
            className={cn(thumbStateStyles, sizeStyles.thumb, styles?.thumb)}
            style={{
              ...getThumbStyles(),
              transform: getThumbTransform(),
            }}
            onClick={handleSwitchClick}
          >
            {/* Thumb Icon */}
            {thumbIcon && (
              <div className="absolute inset-0 flex items-center justify-center">
                {React.cloneElement(thumbIcon, {
                  className: cn("w-3 h-3", thumbIcon.props.className),
                })}
              </div>
            )}
          </span>
        </span>
      </div>
    );

    if (!hasLabel) {
      return (
        <div className={className} style={style}>
          {switchElement}
          <style jsx>{`
            ${switchAnimations}
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
        style={style}
      >
        {switchElement}
        {labelContent}

        {/* Error message */}
        {error && (
          <div className={cn(errorStyles, sizeStyles.label, fadeInAnimation)}>
            {error}
          </div>
        )}

        <style jsx>{`
          ${switchAnimations}
        `}</style>
      </label>
    );
  }
);

Switch.displayName = "Switch";
