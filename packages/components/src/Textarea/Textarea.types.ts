import { ReactNode, TextareaHTMLAttributes } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type TextareaVariant = "default" | "filled" | "outline" | "unstyled";
export type TextareaResize =
  | "none"
  | "both"
  | "horizontal"
  | "vertical"
  | "auto";

export interface TextareaProps
  extends BaseComponentProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "onChange"> {
  /**
   * Current value of the textarea
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;

  /**
   * Label for the textarea
   */
  label?: ReactNode;

  /**
   * Description text between label and textarea
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the textarea
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the textarea
   * @default 'default'
   */
  variant?: TextareaVariant;

  /**
   * Whether the textarea is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the textarea is required
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
   * Minimum number of rows
   * @default 3
   */
  minRows?: number;

  /**
   * Maximum number of rows (for auto-resize)
   */
  maxRows?: number;

  /**
   * Whether textarea should auto-resize
   * @default false
   */
  autosize?: boolean;

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextareaResize;

  /**
   * Maximum length for text
   */
  maxLength?: number;

  /**
   * Minimum length for text
   */
  minLength?: number;

  /**
   * Whether to show character count
   * @default false
   */
  showCharacterCount?: boolean;

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
   * Whether the textarea should auto-focus
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Whether the textarea is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Custom textarea width
   */
  width?: string | number;

  /**
   * Custom textarea height (when not auto-sizing)
   */
  height?: string | number;

  /**
   * Callback when textarea gains focus
   */
  onFocus?: () => void;

  /**
   * Callback when textarea loses focus
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
    textarea?: string;
    description?: string;
    error?: string;
    characterCount?: string;
  };

  /**
   * Whether to enable spell check
   * @default true
   */
  spellCheck?: boolean;

  /**
   * Whether to enable auto-complete
   * @default 'on'
   */
  autoComplete?: string;

  /**
   * Whether to enable auto-correct
   * @default 'on'
   */
  autoCorrect?: string;

  /**
   * Whether to enable auto-capitalize
   * @default 'sentences'
   */
  autoCapitalize?: string;

  /**
   * Input mode for mobile keyboards
   */
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";

  /**
   * Whether to wrap text
   * @default 'soft'
   */
  wrap?: "hard" | "soft" | "off";
}
