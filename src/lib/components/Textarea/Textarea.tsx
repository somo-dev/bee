import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import { TextareaProps } from "./Textarea.types";
import {
  textareaVariants,
  textareaSizes,
  textareaResize,
  requiredIndicatorStyles,
  characterCountStyles,
  errorWithCountStyles,
  textareaAnimations,
  shakeAnimation,
  fadeInAnimation,
  expandAnimation,
} from "./Textarea.styles";
import { cn } from "../../utils/cn";

// Default validation function
const validateTextarea = (
  value: string,
  props: Partial<TextareaProps>
): string | null => {
  const { required, minLength, maxLength } = props;

  // Required validation
  if (required && !value.trim()) {
    return "This field is required";
  }

  // Skip other validations if empty and not required
  if (!value.trim()) return null;

  // Length validation
  if (minLength && value.length < minLength) {
    return `Text must be at least ${minLength} characters long`;
  }
  if (maxLength && value.length > maxLength) {
    return `Text must be no more than ${maxLength} characters long`;
  }

  return null;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      placeholder,
      radius,
      minRows = 3,
      maxRows,
      autosize = false,
      resize = "vertical",
      maxLength,
      minLength,
      showCharacterCount = false,
      validator,
      validateOnBlur = true,
      validateOnChange = false,
      autoFocus = false,
      readOnly = false,
      width,
      height,
      onFocus,
      onBlur,
      onEnterPress,
      styles,
      spellCheck = true,
      autoComplete = "on",
      autoCorrect = "on",
      autoCapitalize = "sentences",
      inputMode,
      wrap = "soft",
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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Use controlled or internal state
    const currentValue = value !== undefined ? String(value) : internalValue;
    const displayError = error || validationError;

    // Auto-focus effect
    useEffect(() => {
      if (autoFocus && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [autoFocus]);

    // Auto-resize effect
    useEffect(() => {
      if (autosize && textareaRef.current) {
        const textarea = textareaRef.current;

        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = "auto";

        // Calculate new height
        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = lineHeight * minRows;
        const maxHeight = maxRows ? lineHeight * maxRows : Infinity;

        const newHeight = Math.min(
          Math.max(scrollHeight, minHeight),
          maxHeight
        );

        // Apply new height with animation
        textarea.style.height = `${newHeight}px`;
      }
    }, [currentValue, autosize, minRows, maxRows]);

    // Validation function
    const performValidation = useCallback(
      (val: string) => {
        if (validator) {
          return validator(val);
        }
        return validateTextarea(val, {
          required,
          minLength,
          maxLength,
        });
      },
      [validator, required, minLength, maxLength]
    );

    // Handle value change
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          onEnterPress?.();
        }
      },
      [onEnterPress]
    );

    const styles_variant = textareaVariants[variant];
    const sizeStyles = textareaSizes[size];
    const resizeClass = textareaResize[resize];

    // Build textarea classes
    const textareaClasses = cn(
      styles_variant.textarea,
      sizeStyles.textarea,
      sizeStyles.padding,
      sizeStyles.minHeight,
      resizeClass,
      {
        "border-red-500 ring-2 ring-red-500 ring-opacity-20":
          displayError && !disabled,
        "border-green-500 ring-2 ring-green-500 ring-opacity-20":
          !displayError && currentValue && hasBeenBlurred && !disabled,
        [shakeAnimation]: displayError && hasBeenBlurred,
      },
      styles?.textarea
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

    const textareaStyle: React.CSSProperties = {
      borderRadius: radius ? `${radius}px` : undefined,
      height:
        height && !autosize
          ? typeof height === "number"
            ? `${height}px`
            : height
          : undefined,
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

        {/* Textarea */}
        <textarea
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          rows={minRows}
          className={textareaClasses}
          style={textareaStyle}
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
          spellCheck={spellCheck}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          inputMode={inputMode}
          wrap={wrap}
          {...props}
        />

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
                className={cn(
                  characterCountStyles,
                  sizeStyles.text,
                  styles?.characterCount,
                  { "text-red-500": isOverLimit }
                )}
              >
                {characterCount}/{maxLength}
              </div>
            )}
          </div>
        )}

        <style jsx>{`
          ${textareaAnimations}
        `}</style>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
