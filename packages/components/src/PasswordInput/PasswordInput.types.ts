import { ReactNode, InputHTMLAttributes } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type PasswordInputVariant = "default" | "filled" | "outline";

export interface PasswordInputProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /**
   * Current value of the password input
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;

  /**
   * Label for the password input
   */
  label?: string;

  /**
   * Description text below the input
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the password input
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the password input
   * @default 'default'
   */
  variant?: PasswordInputVariant;

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
   * Whether to show the visibility toggle button
   * @default true
   */
  toggleTabIndex?: number;

  /**
   * Custom visibility toggle icon when password is visible
   */
  visibilityToggleIcon?: ReactNode;

  /**
   * Custom visibility toggle icon when password is hidden
   */
  visibilityToggleOffIcon?: ReactNode;

  /**
   * Whether to show strength indicator
   * @default false
   */
  showStrengthMeter?: boolean;

  /**
   * Custom strength calculation function
   */
  strengthFunction?: (password: string) => number;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Left section content (icon, etc.)
   */
  leftSection?: ReactNode;

  /**
   * Right section content (additional to visibility toggle)
   */
  rightSection?: ReactNode;
}

export interface OTPInputProps extends BaseComponentProps {
  /**
   * Current OTP value
   */
  value?: string;

  /**
   * Callback when OTP changes
   */
  onChange?: (value: string) => void;

  /**
   * Number of OTP digits
   * @default 6
   */
  length?: number;

  /**
   * Label for the OTP input
   */
  label?: string;

  /**
   * Description text below the input
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the OTP input
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the OTP input
   * @default 'default'
   */
  variant?: PasswordInputVariant;

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
   * Placeholder character for empty fields
   * @default '•'
   */
  placeholder?: string;

  /**
   * Whether to mask the entered digits
   * @default false
   */
  mask?: boolean;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Type of input (numeric or alphanumeric)
   * @default 'numeric'
   */
  type?: "numeric" | "alphanumeric";

  /**
   * Whether to auto-focus the first input
   * @default true
   */
  autoFocus?: boolean;

  /**
   * Callback when OTP is complete
   */
  onComplete?: (value: string) => void;
}
