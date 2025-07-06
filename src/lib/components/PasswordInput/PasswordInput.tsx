import React, { useState, forwardRef } from "react";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { PasswordInputProps } from "./PasswordInput.types";
import {
  passwordInputVariants,
  passwordInputSizes,
  baseInputStyles,
  labelStyles,
  descriptionStyles,
  errorStyles,
  toggleButtonStyles,
  strengthMeterStyles,
  strengthBarStyles,
  strengthColors,
  strengthLabels,
  leftSectionStyles,
  rightSectionStyles,
  inputAnimations,
  shakeAnimation,
  slideInAnimation,
} from "./PasswordInput.styles";
import { cn } from "../../utils/cn";

// Default password strength function
const defaultStrengthFunction = (password: string): number => {
  if (!password) return 0;

  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(score, 5);
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      value = "",
      onChange,
      label,
      description,
      error,
      size = "md",
      variant = "default",
      disabled = false,
      required = false,
      placeholder = "Enter password",
      toggleTabIndex = -1,
      visibilityToggleIcon,
      visibilityToggleOffIcon,
      showStrengthMeter = false,
      strengthFunction = defaultStrengthFunction,
      radius,
      leftSection,
      rightSection,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange?.(newValue);
    };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    const strength = showStrengthMeter ? strengthFunction(value) : 0;
    const strengthPercentage = (strength / 5) * 100;

    const sizeStyles = passwordInputSizes[size];
    const variantStyles = passwordInputVariants[variant];

    // Calculate padding based on sections
    const hasLeftSection = !!leftSection;
    const hasRightSection = !!rightSection || showStrengthMeter;

    let inputPadding = sizeStyles.padding;
    if (hasLeftSection) {
      inputPadding = inputPadding
        .replace("px-3", "pl-10")
        .replace("px-4", "pl-12")
        .replace("px-5", "pl-14");
    }
    if (hasRightSection) {
      inputPadding = inputPadding
        .replace("px-3", "pr-20")
        .replace("px-4", "pr-24")
        .replace("px-5", "pr-28");
    } else {
      inputPadding = inputPadding
        .replace("px-3", "pr-10")
        .replace("px-4", "pr-12")
        .replace("px-5", "pr-14");
    }

    const inputClasses = cn(
      baseInputStyles,
      variantStyles.input,
      sizeStyles.input,
      inputPadding,
      {
        "border-red-500 ring-2 ring-red-500 ring-opacity-20":
          error && !disabled,
        "ring-2 ring-blue-500 ring-opacity-20": focused && !error && !disabled,
      },
      className
    );

    const combinedStyles: React.CSSProperties = {
      borderRadius: radius ? `${radius}px` : undefined,
      ...style,
    };

    return (
      <div className={cn(variantStyles.wrapper)}>
        {/* Label */}
        {label && (
          <label className={cn(labelStyles, sizeStyles.text)}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Section */}
          {leftSection && (
            <div className={cn(leftSectionStyles, sizeStyles.icon)}>
              {React.isValidElement(leftSection)
                ? React.cloneElement(leftSection, {
                    className: cn(sizeStyles.icon, leftSection.props.className),
                  })
                : leftSection}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            className={inputClasses}
            style={combinedStyles}
            {...props}
          />

          {/* Right Section */}
          <div className={cn(rightSectionStyles, "flex items-center gap-2")}>
            {rightSection && (
              <div className={sizeStyles.icon}>
                {React.isValidElement(rightSection)
                  ? React.cloneElement(rightSection, {
                      className: cn(
                        sizeStyles.icon,
                        rightSection.props.className
                      ),
                    })
                  : rightSection}
              </div>
            )}

            {/* Visibility Toggle */}
            <button
              type="button"
              tabIndex={toggleTabIndex}
              onClick={toggleVisibility}
              disabled={disabled}
              className={cn(
                toggleButtonStyles,
                "p-2 flex items-center justify-center",
                {
                  "cursor-not-allowed opacity-50": disabled,
                }
              )}
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible
                ? visibilityToggleOffIcon || (
                    <EyeOff className={cn(sizeStyles.icon)} />
                  )
                : visibilityToggleIcon || (
                    <Eye className={cn(sizeStyles.icon)} />
                  )}
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        {showStrengthMeter && value && (
          <div className={cn(strengthMeterStyles, slideInAnimation)}>
            <div
              className={cn(
                strengthBarStyles,
                strengthColors[strength as keyof typeof strengthColors]
              )}
              style={{ width: `${strengthPercentage}%` }}
            />
          </div>
        )}

        {/* Strength Label */}
        {showStrengthMeter && value && (
          <div
            className={cn(
              "mt-1 text-xs",
              strengthColors[strength as keyof typeof strengthColors].replace(
                "bg-",
                "text-"
              )
            )}
          >
            {strengthLabels[strength as keyof typeof strengthLabels]}
          </div>
        )}

        {/* Description */}
        {description && !error && (
          <div className={cn(descriptionStyles, sizeStyles.text)}>
            {description}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={cn(errorStyles, sizeStyles.text, shakeAnimation)}>
            {error}
          </div>
        )}

        <style jsx>{`
          ${inputAnimations}
        `}</style>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
