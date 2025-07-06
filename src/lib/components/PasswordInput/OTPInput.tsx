import React, { useState, useRef, useEffect } from "react";
import { OTPInputProps } from "./PasswordInput.types";
import {
  passwordInputVariants,
  otpInputSizes,
  baseOTPInputStyles,
  labelStyles,
  descriptionStyles,
  errorStyles,
  inputAnimations,
  shakeAnimation,
  slideInAnimation,
} from "./PasswordInput.styles";
import { cn } from "../../utils/cn";

export const OTPInput: React.FC<OTPInputProps> = ({
  value = "",
  onChange,
  length = 6,
  label,
  description,
  error,
  size = "md",
  variant = "default",
  disabled = false,
  required = false,
  placeholder = "•",
  mask = false,
  radius,
  type = "numeric",
  autoFocus = true,
  onComplete,
  className,
  ...props
}) => {
  const [values, setValues] = useState<string[]>(
    Array.from({ length }, (_, i) => value[i] || "")
  );
  const [focusedIndex, setFocusedIndex] = useState(autoFocus ? 0 : -1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update internal state when value prop changes
  useEffect(() => {
    const newValues = Array.from({ length }, (_, i) => value[i] || "");
    setValues(newValues);
  }, [value, length]);

  // Auto-focus first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  // Focus management
  useEffect(() => {
    if (
      focusedIndex >= 0 &&
      focusedIndex < length &&
      inputRefs.current[focusedIndex]
    ) {
      inputRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, length]);

  const handleChange = (index: number, newValue: string) => {
    // Validate input based on type
    let sanitizedValue = newValue;
    if (type === "numeric") {
      sanitizedValue = newValue.replace(/[^0-9]/g, "");
    } else {
      sanitizedValue = newValue.replace(/[^a-zA-Z0-9]/g, "");
    }

    // Take only the last character if multiple characters are entered
    if (sanitizedValue.length > 1) {
      sanitizedValue = sanitizedValue.slice(-1);
    }

    const newValues = [...values];
    newValues[index] = sanitizedValue;
    setValues(newValues);

    const newOTPValue = newValues.join("");
    onChange?.(newOTPValue);

    // Auto-focus next input
    if (sanitizedValue && index < length - 1) {
      setFocusedIndex(index + 1);
    }

    // Call onComplete when OTP is fully entered
    if (newOTPValue.length === length && onComplete) {
      onComplete(newOTPValue);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (event.key) {
      case "Backspace":
        if (!values[index] && index > 0) {
          // Move to previous input if current is empty
          setFocusedIndex(index - 1);
          const newValues = [...values];
          newValues[index - 1] = "";
          setValues(newValues);
          onChange?.(newValues.join(""));
        } else if (values[index]) {
          // Clear current input
          const newValues = [...values];
          newValues[index] = "";
          setValues(newValues);
          onChange?.(newValues.join(""));
        }
        break;

      case "Delete":
        const newValues = [...values];
        newValues[index] = "";
        setValues(newValues);
        onChange?.(newValues.join(""));
        break;

      case "ArrowLeft":
        event.preventDefault();
        if (index > 0) {
          setFocusedIndex(index - 1);
        }
        break;

      case "ArrowRight":
        event.preventDefault();
        if (index < length - 1) {
          setFocusedIndex(index + 1);
        }
        break;

      case "Home":
        event.preventDefault();
        setFocusedIndex(0);
        break;

      case "End":
        event.preventDefault();
        setFocusedIndex(length - 1);
        break;
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");

    let sanitizedData = pastedData;
    if (type === "numeric") {
      sanitizedData = pastedData.replace(/[^0-9]/g, "");
    } else {
      sanitizedData = pastedData.replace(/[^a-zA-Z0-9]/g, "");
    }

    const newValues = [...values];
    const startIndex = focusedIndex >= 0 ? focusedIndex : 0;

    for (
      let i = 0;
      i < Math.min(sanitizedData.length, length - startIndex);
      i++
    ) {
      newValues[startIndex + i] = sanitizedData[i];
    }

    setValues(newValues);
    const newOTPValue = newValues.join("");
    onChange?.(newOTPValue);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newValues.findIndex(
      (val, idx) => idx > startIndex && !val
    );
    const nextFocusIndex =
      nextEmptyIndex !== -1
        ? nextEmptyIndex
        : Math.min(startIndex + sanitizedData.length, length - 1);
    setFocusedIndex(nextFocusIndex);

    // Call onComplete if OTP is fully entered
    if (newOTPValue.length === length && onComplete) {
      onComplete(newOTPValue);
    }
  };

  const sizeStyles = otpInputSizes[size];
  const variantStyles = passwordInputVariants[variant];

  const renderInput = (index: number) => {
    const inputValue = values[index];
    const displayValue = mask && inputValue ? "•" : inputValue;
    const isEmpty = !inputValue;
    const isFocused = focusedIndex === index;

    const inputClasses = cn(
      baseOTPInputStyles,
      variantStyles.input,
      sizeStyles.input,
      {
        "border-red-500 ring-2 ring-red-500 ring-opacity-20":
          error && !disabled,
        "border-blue-500 ring-2 ring-blue-500 ring-opacity-20":
          isFocused && !error && !disabled,
        "border-gray-300": !isFocused && !error && !disabled && isEmpty,
        "border-gray-400": !isFocused && !error && !disabled && !isEmpty,
        "opacity-50 cursor-not-allowed": disabled,
      }
    );

    return (
      <input
        key={index}
        ref={(el) => {
          inputRefs.current[index] = el;
        }}
        type="text"
        inputMode={type === "numeric" ? "numeric" : "text"}
        value={displayValue}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        onPaste={handlePaste}
        onFocus={() => setFocusedIndex(index)}
        onBlur={() => setFocusedIndex(-1)}
        disabled={disabled}
        placeholder={isEmpty ? placeholder : ""}
        className={inputClasses}
        style={{
          borderRadius: radius ? `${radius}px` : undefined,
        }}
        maxLength={1}
        autoComplete="one-time-code"
        aria-label={`Digit ${index + 1} of ${length}`}
      />
    );
  };

  return (
    <div className={className} {...props}>
      {/* Label */}
      {label && (
        <label className={cn(labelStyles, sizeStyles.text)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* OTP Inputs */}
      <div
        className={cn("flex justify-center", sizeStyles.gap, slideInAnimation)}
      >
        {Array.from({ length }, (_, index) => renderInput(index))}
      </div>

      {/* Description */}
      {description && !error && (
        <div
          className={cn(descriptionStyles, sizeStyles.text, "text-center mt-2")}
        >
          {description}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className={cn(
            errorStyles,
            sizeStyles.text,
            "text-center mt-2",
            shakeAnimation
          )}
        >
          {error}
        </div>
      )}

      <style jsx>{`
        ${inputAnimations}
      `}</style>
    </div>
  );
};

OTPInput.displayName = "OTPInput";
