import { ReactNode, TextareaHTMLAttributes } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type JSONInputVariant = "default" | "filled" | "outline";

export interface JSONInputProps
  extends BaseComponentProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "onChange"> {
  /**
   * Current JSON value as string
   */
  value?: string;

  /**
   * Callback when JSON value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback when JSON is parsed successfully
   */
  onValidJSON?: (parsedValue: any) => void;

  /**
   * Callback when JSON parsing fails
   */
  onInvalidJSON?: (error: string) => void;

  /**
   * Label for the JSON input
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
   * Size of the JSON input
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the JSON input
   * @default 'default'
   */
  variant?: JSONInputVariant;

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
   * Height of the input area
   * @default 200
   */
  height?: number | string;

  /**
   * Whether to auto-format JSON on blur
   * @default true
   */
  autoFormat?: boolean;

  /**
   * Whether to validate JSON in real-time
   * @default true
   */
  realTimeValidation?: boolean;

  /**
   * Number of spaces for indentation
   * @default 2
   */
  indentSize?: number;

  /**
   * Whether to show line numbers
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Whether to enable syntax highlighting
   * @default true
   */
  syntaxHighlighting?: boolean;

  /**
   * Whether to show validation status indicator
   * @default true
   */
  showValidationStatus?: boolean;

  /**
   * Whether to enable keyboard shortcuts
   * @default true
   */
  enableKeyboardShortcuts?: boolean;

  /**
   * Custom validation function
   */
  customValidator?: (value: string) => {
     parsed(parsed: any): unknown; isValid: boolean; error?: string 
};

  /**
   * Whether to allow comments in JSON (JSON5 style)
   * @default false
   */
  allowComments?: boolean;

  /**
   * Whether to show format button
   * @default true
   */
  showFormatButton?: boolean;

  /**
   * Whether to show copy button
   * @default true
   */
  showCopyButton?: boolean;

  /**
   * Whether to show clear button
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Custom theme colors for syntax highlighting
   */
  theme?: {
    background?: string;
    text?: string;
    string?: string;
    number?: string;
    boolean?: string;
    null?: string;
    key?: string;
    punctuation?: string;
    comment?: string;
  };

  /**
   * Maximum number of lines to display before scrolling
   */
  maxLines?: number;

  /**
   * Minimum number of lines to display
   * @default 5
   */
  minLines?: number;

  /**
   * Whether to auto-resize based on content
   * @default false
   */
  autoResize?: boolean;

  /**
   * Custom styles for different parts
   */
  styles?: {
    container?: string;
    input?: string;
    lineNumbers?: string;
    toolbar?: string;
    status?: string;
  };
}
