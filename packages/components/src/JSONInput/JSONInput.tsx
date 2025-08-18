"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Code,
  Copy,
  Check,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
} from "lucide-react";
import { JSONInputProps } from "./JSONInput.types";
import {
  jsonInputVariants,
  jsonInputSizes,
  baseContainerStyles,
  inputContainerStyles,
  overlayStyles,
  labelStyles,
  descriptionStyles,
  errorStyles,
  toolbarStyles,
  toolbarButtonStyles,
  statusIndicatorStyles,
  validStatusStyles,
  invalidStatusStyles,
  neutralStatusStyles,
  lineNumberStyles,
  defaultTheme,
  jsonInputAnimations,
  fadeInAnimation,
  slideInAnimation,
  shakeAnimation,
  successAnimation,
} from "./JSONInput.styles";
import { cn } from "../utils/cn";

// JSON validation and formatting utilities
const validateJSON = (
  value: string,
  allowComments = false
): { isValid: boolean; error?: string; parsed?: any } => {
  if (!value.trim()) {
    return { isValid: true, parsed: null };
  }

  try {
    // Remove comments if allowed (simple implementation)
    let cleanValue = value;
    if (allowComments) {
      cleanValue = value
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove /* */ comments
        .replace(/\/\/.*$/gm, ""); // Remove // comments
    }

    const parsed = JSON.parse(cleanValue);
    return { isValid: true, parsed };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid JSON format",
    };
  }
};

const formatJSON = (
  value: string,
  indentSize = 2,
  allowComments = false
): string => {
  try {
    const validation = validateJSON(value, allowComments);
    if (validation.isValid && validation.parsed !== null) {
      return JSON.stringify(validation.parsed, null, indentSize);
    }
    return value;
  } catch {
    return value;
  }
};

// Syntax highlighting function
const highlightJSON = (value: string, theme = defaultTheme): string => {
  if (!value.trim()) return value;

  return (
    value
      // Strings
      .replace(
        /"([^"\\]|\\.)*"/g,
        `<span style="color: ${theme.string}">$&</span>`
      )
      // Numbers
      .replace(
        /\b-?\d+\.?\d*([eE][+-]?\d+)?\b/g,
        `<span style="color: ${theme.number}">$&</span>`
      )
      // Booleans
      .replace(
        /\b(true|false)\b/g,
        `<span style="color: ${theme.boolean}">$&</span>`
      )
      // Null
      .replace(/\bnull\b/g, `<span style="color: ${theme.null}">$&</span>`)
      // Keys (property names)
      .replace(
        /"([^"\\]|\\.)*"(?=\s*:)/g,
        `<span style="color: ${theme.key}">$&</span>`
      )
      // Punctuation
      .replace(
        /[{}[\],]/g,
        `<span style="color: ${theme.punctuation}">$&</span>`
      )
      // Comments (if enabled)
      .replace(
        /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        `<span style="color: ${theme.comment}">$&</span>`
      )
  );
};

// Generate line numbers
const generateLineNumbers = (value: string): string[] => {
  const lines = value.split("\n");
  return lines.map((_, index) => (index + 1).toString());
};

export const JSONInput: React.FC<JSONInputProps> = ({
  value = "",
  onChange,
  onValidJSON,
  onInvalidJSON,
  label,
  description,
  error,
  size = "md",
  variant = "default",
  disabled = false,
  required = false,
  placeholder = '{\n  "key": "value"\n}',
  radius,
  height = 200,
  autoFormat = true,
  realTimeValidation = true,
  indentSize = 2,
  showLineNumbers = true,
  syntaxHighlighting = true,
  showValidationStatus = true,
  enableKeyboardShortcuts = true,
  customValidator,
  allowComments = false,
  showFormatButton = true,
  showCopyButton = true,
  showClearButton = true,
  theme = defaultTheme,
  maxLines,
  minLines = 5,
  autoResize = false,
  styles,
  className,
  style,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    error?: string;
    parsed?: any;
  }>({ isValid: true });
  const [isFocused, setIsFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastFormatted, setLastFormatted] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use controlled or internal state
  const currentValue = value !== undefined ? value : internalValue;

  // Validation effect
  useEffect(() => {
    if (realTimeValidation) {
      const validation = customValidator
        ? customValidator(currentValue)
        : validateJSON(currentValue, allowComments);

      setValidationState(validation);

      if (validation.isValid) {
        onValidJSON?.(validation.parsed);
      } else {
        onInvalidJSON?.(validation.error || "Invalid JSON");
      }
    }
  }, [
    currentValue,
    realTimeValidation,
    customValidator,
    allowComments,
    onValidJSON,
    onInvalidJSON,
  ]);

  // Handle value change
  const handleChange = useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange]
  );

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    handleChange(newValue);
  };

  // Format JSON
  const handleFormat = useCallback(() => {
    if (disabled) return;

    const formatted = formatJSON(currentValue, indentSize, allowComments);
    if (formatted !== currentValue) {
      handleChange(formatted);
      setLastFormatted(true);
      setTimeout(() => setLastFormatted(false), 1000);
    }
  }, [currentValue, indentSize, allowComments, disabled, handleChange]);

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (disabled) return;

    try {
      await navigator.clipboard.writeText(currentValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [currentValue, disabled]);

  // Clear input
  const handleClear = useCallback(() => {
    if (disabled) return;
    handleChange("");
  }, [disabled, handleChange]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!enableKeyboardShortcuts || disabled) return;

      const { ctrlKey, metaKey, key, shiftKey } = event;
      const isModifier = ctrlKey || metaKey;

      // Format JSON (Ctrl/Cmd + Shift + F)
      if (isModifier && shiftKey && key === "F") {
        event.preventDefault();
        handleFormat();
        return;
      }

      // Copy (Ctrl/Cmd + C) - only if text is selected or no selection
      if (isModifier && key === "c") {
        const textarea = event.currentTarget;
        if (textarea.selectionStart === textarea.selectionEnd) {
          event.preventDefault();
          handleCopy();
          return;
        }
      }

      // Auto-indent on Enter
      if (key === "Enter") {
        const textarea = event.currentTarget;
        const { selectionStart, value } = textarea;
        const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
        const currentLine = value.slice(lineStart, selectionStart);
        const indent = currentLine.match(/^\s*/)?.[0] || "";

        // Add extra indent after opening braces/brackets
        const extraIndent = /[{\[]$/.test(currentLine.trim())
          ? " ".repeat(indentSize)
          : "";

        event.preventDefault();
        const newValue =
          value.slice(0, selectionStart) +
          "\n" +
          indent +
          extraIndent +
          value.slice(selectionStart);

        handleChange(newValue);

        // Set cursor position
        setTimeout(() => {
          const newPosition =
            selectionStart + 1 + indent.length + extraIndent.length;
          textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
      }

      // Auto-close brackets and braces
      if (key === "{" || key === "[") {
        const textarea = event.currentTarget;
        const { selectionStart, selectionEnd, value } = textarea;
        const closeChar = key === "{" ? "}" : "]";

        event.preventDefault();
        const newValue =
          value.slice(0, selectionStart) +
          key +
          value.slice(selectionStart, selectionEnd) +
          closeChar +
          value.slice(selectionEnd);

        handleChange(newValue);

        // Set cursor position between brackets
        setTimeout(() => {
          textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
        }, 0);
      }
    },
    [
      enableKeyboardShortcuts,
      disabled,
      handleFormat,
      handleCopy,
      handleChange,
      indentSize,
    ]
  );

  // Handle blur (auto-format if enabled)
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (autoFormat && !disabled) {
      handleFormat();
    }
  }, [autoFormat, disabled, handleFormat]);

  // Sync scroll between textarea and overlay
  const handleScroll = useCallback(() => {
    if (overlayRef.current && textareaRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  // Calculate dynamic height for auto-resize
  const dynamicHeight = useMemo(() => {
    if (!autoResize) return height;

    const lines = currentValue.split("\n").length;
    const clampedLines = Math.max(
      minLines,
      maxLines ? Math.min(lines, maxLines) : lines
    );
    return `${clampedLines * 1.5}rem`;
  }, [autoResize, currentValue, height, minLines, maxLines]);

  // Generate highlighted content
  const highlightedContent = useMemo(() => {
    if (!syntaxHighlighting) return currentValue;
    // Ensure all required theme properties are present for highlightJSON
    return highlightJSON(currentValue, {
      background: theme.background ?? "",
      text: theme.text ?? "",
      string: theme.string ?? "",
      number: theme.number ?? "",
      boolean: theme.boolean ?? "",
      null: theme.null ?? "",
      key: theme.key ?? "",
      punctuation: theme.punctuation ?? "",
      comment: theme.comment ?? "",
    });
  }, [currentValue, syntaxHighlighting, theme]);

  // Generate line numbers
  const lineNumbers = useMemo(() => {
    if (!showLineNumbers) return [];
    return generateLineNumbers(currentValue);
  }, [currentValue, showLineNumbers]);

  const styles_variant = jsonInputVariants[variant];
  const sizeStyles = jsonInputSizes[size];

  const containerClasses = cn(
    baseContainerStyles,
    styles_variant.container,
    sizeStyles.container,
    {
      "border-red-500 ring-2 ring-red-500 ring-opacity-20": error && !disabled,
      "border-green-500 ring-2 ring-green-500 ring-opacity-20":
        validationState.isValid && currentValue && !error && !disabled,
      "opacity-50 cursor-not-allowed": disabled,
      [shakeAnimation]: !validationState.isValid && currentValue,
      [successAnimation]: lastFormatted,
    },
    styles?.container,
    className
  );

  const inputClasses = cn(
    styles_variant.input,
    sizeStyles.input,
    sizeStyles.padding,
    styles?.input
  );

  const lineNumberClasses = cn(
    styles_variant.lineNumbers,
    sizeStyles.lineNumbers,
    lineNumberStyles,
    styles?.lineNumbers
  );

  const combinedStyles: React.CSSProperties = {
    borderRadius: radius ? `${radius}px` : undefined,
    ...style,
  };

  const inputStyle: React.CSSProperties = {
    height: dynamicHeight,
    minHeight: typeof height === "number" ? `${height}px` : height,
    backgroundColor: theme.background,
    color: theme.text,
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      {label && (
        <label className={cn(labelStyles, sizeStyles.text)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        className={containerClasses}
        style={combinedStyles}
      >
        {/* Toolbar */}
        <div className={cn(toolbarStyles, sizeStyles.toolbar, styles?.toolbar)}>
          <div className="flex items-center gap-2">
            {/* Format Button */}
            {showFormatButton && (
              <button
                type="button"
                onClick={handleFormat}
                disabled={disabled}
                className={toolbarButtonStyles}
                title="Format JSON (Ctrl+Shift+F)"
              >
                <Code className="w-3 h-3" />
                Format
              </button>
            )}

            {/* Copy Button */}
            {showCopyButton && (
              <button
                type="button"
                onClick={handleCopy}
                disabled={disabled || !currentValue}
                className={toolbarButtonStyles}
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            )}

            {/* Clear Button */}
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled || !currentValue}
                className={toolbarButtonStyles}
                title="Clear content"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Validation Status */}
          {showValidationStatus && (
            <div className={cn(statusIndicatorStyles, styles?.status)}>
              {!currentValue ? (
                <div className={neutralStatusStyles}>
                  <Info className="w-3 h-3" />
                  <span>Empty</span>
                </div>
              ) : validationState.isValid ? (
                <div className={cn(validStatusStyles, fadeInAnimation)}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Valid JSON</span>
                </div>
              ) : (
                <div className={cn(invalidStatusStyles, slideInAnimation)}>
                  <AlertCircle className="w-3 h-3" />
                  <span>Invalid JSON</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Container */}
        <div className={inputContainerStyles}>
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className={lineNumberClasses}>
              {lineNumbers.map((lineNum, index) => (
                <div key={index} className="px-2 text-right">
                  {lineNum}
                </div>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="relative flex-1">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={currentValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              onScroll={handleScroll}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
              className={cn(inputClasses, "font-mono")}
              style={{
                ...inputStyle,
                color: theme.text,
                caretColor: theme.text,
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              {...props}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      {description && !error && (
        <div className={cn(descriptionStyles, sizeStyles.text)}>
          {description}
        </div>
      )}

      {/* Error */}
      {(error || (!validationState.isValid && currentValue)) && (
        <div className={cn(errorStyles, sizeStyles.text, slideInAnimation)}>
          {error || validationState.error}
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {enableKeyboardShortcuts && isFocused && (
        <div className={cn("mt-2 text-xs text-gray-500", fadeInAnimation)}>
          <div className="flex flex-wrap gap-4">
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Ctrl+Shift+F
              </kbd>{" "}
              Format
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Ctrl+C
              </kbd>{" "}
              Copy all
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Enter
              </kbd>{" "}
              Auto-indent
            </span>
          </div>
        </div>
      )}

      <style>{`
        ${jsonInputAnimations}
      `}</style>
    </div>
  );
};

JSONInput.displayName = "JSONInput";
