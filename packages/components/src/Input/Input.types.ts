import { ReactNode, InputHTMLAttributes, ReactElement } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type InputVariant = "default" | "filled" | "outline" | "unstyled";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week";

export interface InputProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /**
   * Current value of the input
   */
  value?: string | number;

  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;

  /**
   * Input type for validation and behavior
   * @default 'text'
   */
  type?: InputType;

  /**
   * Label for the input
   */
  label?: ReactNode;

  /**
   * Description text below the input
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the input
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the input
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Left section content (icon, prefix, etc.)
   */
  leftSection?: ReactNode;

  /**
   * Right section content (icon, suffix, etc.)
   */
  rightSection?: ReactNode;

  /**
   * Whether to show validation status icon
   * @default false
   */
  showValidationIcon?: boolean;

  /**
   * Custom validation function
   */
  validator?: (value: string) => string | null;

  /**
   * Whether to validate on blur
   * @default true
   */
  validateOnBlur?: boolean;

  /**
   * Whether to validate on change
   * @default false
   */
  validateOnChange?: boolean;

  /**
   * Minimum length for text inputs
   */
  minLength?: number;

  /**
   * Maximum length for text inputs
   */
  maxLength?: number;

  /**
   * Pattern for validation (regex string)
   */
  pattern?: string;

  /**
   * Minimum value for number inputs
   */
  min?: number;

  /**
   * Maximum value for number inputs
   */
  max?: number;

  /**
   * Step for number inputs
   */
  step?: number;

  /**
   * Whether to show character count
   * @default false
   */
  showCharacterCount?: boolean;

  /**
   * Whether the input should auto-focus
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Whether the input is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Custom input width
   */
  width?: string | number;

  /**
   * Callback when input gains focus
   */
  onFocus?: () => void;

  /**
   * Callback when input loses focus
   */
  onBlur?: () => void;

  /**
   * Callback when Enter key is pressed
   */
  onEnterPress?: () => void;

  /**
   * Custom styles for different parts
   */
  styles?: {
    wrapper?: string;
    label?: string;
    input?: string;
    leftSection?: string;
    rightSection?: string;
    description?: string;
    error?: string;
  };
}
