import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import {
  Check,
  X,
  AlertCircle,
  Mail,
  Phone,
  Search,
  Calendar,
  Clock,
  Globe,
  Hash,
  Eye,
  EyeOff,
} from "lucide-react";
import { InputProps, InputType } from "./Input.types";
import {
  inputVariants,
  inputSizes,
  leftSectionStyles,
  rightSectionStyles,
  validationIconStyles,
  characterCountStyles,
  requiredIndicatorStyles,
  errorWithCountStyles,
  numberInputStyles,
  inputAnimations,
  shakeAnimation,
  fadeInAnimation,
} from "./Input.styles";
import { cn } from "../../utils/cn";

// Default validation patterns
const validationPatterns: Record<string, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+\..+/,
  number: /^-?\d*\.?\d+$/,
};

// Default validation messages
const validationMessages: Record<string, string> = {
  required: "This field is required",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  url: "Please enter a valid URL",
  number: "Please enter a valid number",
  minLength: "Input is too short",
  maxLength: "Input is too long",
  min: "Value is too small",
  max: "Value is too large",
  pattern: "Input format is invalid",
};

// Built-in validation function
const validateInput = (
  value: string,
  type: InputType,
  props: Partial<InputProps>
): string | null => {
  const { required, minLength, maxLength, min, max, pattern } = props;

  // Required validation
  if (required && !value.trim()) {
    return validationMessages.required;
  }

  // Skip other validations if empty and not required
  if (!value.trim()) return null;

  // Type-specific validation
  switch (type) {
    case "email":
      if (!validationPatterns.email.test(value)) {
        return validationMessages.email;
      }
      break;
    case "tel":
      if (!validationPatterns.phone.test(value)) {
        return validationMessages.phone;
      }
      break;
    case "url":
      if (!validationPatterns.url.test(value)) {
        return validationMessages.url;
      }
      break;
    case "number":
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return validationMessages.number;
      }
      if (min !== undefined && numValue < min) {
        return `${validationMessages.min} (minimum: ${min})`;
      }
      if (max !== undefined && numValue > max) {
        return `${validationMessages.max} (maximum: ${max})`;
      }
      break;
  }

  // Length validation
  if (minLength && value.length < minLength) {
    return `${validationMessages.minLength} (minimum: ${minLength} characters)`;
  }
  if (maxLength && value.length > maxLength) {
    return `${validationMessages.maxLength} (maximum: ${maxLength} characters)`;
  }

  // Pattern validation
  if (pattern && !new RegExp(pattern).test(value)) {
    return validationMessages.pattern;
  }

  return null;
};

// Get default icon for input type
const getTypeIcon = (type: InputType) => {
  switch (type) {
    case "email":
      return <Mail />;
    case "tel":
      return <Phone />;
    case "search":
      return <Search />;
    case "url":
      return <Globe />;
    case "date":
    case "datetime-local":
    case "month":
    case "week":
      return <Calendar />;
    case "time":
      return <Clock />;
    case "number":
      return <Hash />;
    default:
      return null;
  }
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = "",
      onChange,
      type = "text",
      label,
      description,
      error,
      size = "md",
      variant = "default",
      disabled = false,
      required = false,
      placeholder,
      radius,
      leftSection,
      rightSection,
      showValidationIcon = false,
      validator,
      validateOnBlur = true,
      validateOnChange = false,
      minLength,
      maxLength,
      pattern,
      min,
      max,
      step,
      showCharacterCount = false,
      autoFocus = false,
      readOnly = false,
      width,
      onFocus,
      onBlur,
      onEnterPress,
      styles,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(String(value || ""));
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Use controlled or internal state
    const currentValue = value !== undefined ? String(value) : internalValue;
    const displayError = error || validationError;

    // Auto-focus effect
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Validation function
    const performValidation = useCallback(
      (val: string) => {
        if (validator) {
          return validator(val);
        }
        return validateInput(val, type, {
          required,
          minLength,
          maxLength,
          min,
          max,
          pattern,
        });
      },
      [validator, type, required, minLength, maxLength, min, max, pattern]
    );

    // Handle value change
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (value === undefined) {
          setInternalValue(newValue);
        }

        onChange?.(newValue);

        // Validate on change if enabled
        if (validateOnChange) {
          const validationResult = performValidation(newValue);
          setValidationError(validationResult);
        }
      },
      [value, onChange, validateOnChange, performValidation]
    );

    // Handle focus
    const handleFocus = useCallback(() => {
      setIsFocused(true);
      onFocus?.();
    }, [onFocus]);

    // Handle blur
    const handleBlur = useCallback(() => {
      setIsFocused(false);
      setHasBeenBlurred(true);
      onBlur?.();

      // Validate on blur if enabled
      if (validateOnBlur) {
        const validationResult = performValidation(currentValue);
        setValidationError(validationResult);
      }
    }, [onBlur, validateOnBlur, performValidation, currentValue]);

    // Handle key press
    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onEnterPress?.();
        }
      },
      [onEnterPress]
    );

    // Get validation status
    const getValidationStatus = () => {
      if (!showValidationIcon || !hasBeenBlurred) return null;
      if (displayError) return "error";
      if (currentValue && !displayError) return "success";
      return null;
    };

    // Handle password visibility toggle
    const handlePasswordToggle = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    // Get actual input type (for password visibility)
    const getInputType = () => {
      if (type === "password") {
        return showPassword ? "text" : "password";
      }
      return type;
    };

    const validationStatus = getValidationStatus();
    const styles_variant = inputVariants[variant];
    const sizeStyles = inputSizes[size];

    // Calculate padding based on sections
    const hasLeftSection =
      !!leftSection || (type !== "text" && type !== "password");
    const hasRightSection =
      !!rightSection || showValidationIcon || showCharacterCount || type === "password";

    let inputPadding = sizeStyles.padding;
    if (hasLeftSection) {
      inputPadding = inputPadding.replace(/px-\d+/, sizeStyles.leftPadding);
    }
    if (hasRightSection) {
      inputPadding = inputPadding.replace(/pr-\d+/, sizeStyles.rightPadding);
    }

    // Build input classes
    const inputClasses = cn(
      styles_variant.input,
      sizeStyles.input,
      inputPadding,
      type === "number" && numberInputStyles,
      {
        "border-red-500 ring-2 ring-red-500 ring-opacity-20":
          displayError && !disabled,
        "border-green-500 ring-2 ring-green-500 ring-opacity-20":
          validationStatus === "success" && !disabled,
        [shakeAnimation]: displayError && hasBeenBlurred,
      },
      styles?.input
    );

    // Container styles
    const containerStyle: React.CSSProperties = {
      width: width
        ? typeof width === "number"
          ? `${width}px`
          : width
        : undefined,
      ...style,
    };

    const inputStyle: React.CSSProperties = {
      borderRadius: radius ? `${radius}px` : undefined,
    };

    // Character count
    const characterCount = currentValue.length;
    const isOverLimit = maxLength && characterCount > maxLength;

    return (
      <div
        className={cn(styles_variant.wrapper, styles?.wrapper, className)}
        style={containerStyle}
      >
        {/* Label */}
        {label && (
          <label
            className={cn(styles_variant.label, sizeStyles.text, styles?.label)}
          >
            {label}
            {required && <span className={requiredIndicatorStyles}>*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <div
            id="description"
            className={cn(
              styles_variant.description,
              sizeStyles.text,
              styles?.description
            )}
          >
            {description}
          </div>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Section */}
          {(leftSection || (type !== "text" && type !== "password")) && (
            <div
              className={cn(
                leftSectionStyles,
                sizeStyles.icon,
                styles?.leftSection
              )}
            >
              {leftSection || getTypeIcon(type)}
            </div>
          )}

          {/* Input */}
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type={getInputType()}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            min={min}
            max={max}
            step={step}
            className={inputClasses}
            style={inputStyle}
            aria-invalid={!!displayError}
            aria-describedby={
              [
                description ? "description" : "",
                displayError ? "error" : "",
                showCharacterCount ? "character-count" : "",
              ]
              .filter(Boolean)
              .join(" ") || undefined
            }
            {...props}
          />

          {/* Right Section */}
          {(rightSection || showValidationIcon || type === "password") && (
            <div
              className={cn(
                rightSectionStyles,
                sizeStyles.icon,
                styles?.rightSection
              )}
            >
              {/* Password Toggle */}
              {type === "password" && (
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                  disabled={disabled}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className={cn(sizeStyles.icon)} />
                  ) : (
                    <Eye className={cn(sizeStyles.icon)} />
                  )}
                </button>
              )}

              {/* Validation Icon */}
              {showValidationIcon && validationStatus && (
                <div className={cn(validationIconStyles, fadeInAnimation)}>
                  {validationStatus === "success" ? (
                    <Check className={cn(sizeStyles.icon, "text-green-500")} />
                  ) : validationStatus === "error" ? (
                    <AlertCircle
                      className={cn(sizeStyles.icon, "text-red-500")}
                    />
                  ) : null}
                </div>
              )}

              {/* Custom Right Section */}
              {rightSection && !showValidationIcon && type !== "password" && rightSection}
            </div>
          )}
        </div>

        {/* Error with Character Count */}
        {(displayError || (showCharacterCount && maxLength)) && (
          <div className={errorWithCountStyles}>
            {/* Error Message */}
            {displayError && (
              <div
                id="error"
                className={cn(
                  styles_variant.error,
                  sizeStyles.text,
                  styles?.error,
                  fadeInAnimation
                )}
              >
                {displayError}
              </div>
            )}

            {/* Character Count */}
            {showCharacterCount && maxLength && (
              <div
                id="character-count"
                className={cn(characterCountStyles, sizeStyles.text, {
                  "text-red-500": isOverLimit,
                })}
              >
                {characterCount}/{maxLength}
              </div>
            )}
          </div>
        )}

        <style jsx>{`
          ${inputAnimations}
        `}</style>
      </div>
    );
  }
);

Input.displayName = "Input";
