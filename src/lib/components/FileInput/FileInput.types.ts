import { ReactNode, InputHTMLAttributes, ReactElement } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type FileInputVariant = "button" | "dropzone";

export interface FileInputProps
  extends BaseComponentProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "value" | "onChange" | "accept" | "onDrop" | "onDragEnter" | "onDragLeave"
    > {
  /**
   * Current file(s) value
   */
  value?: File | File[] | null;

  /**
   * Callback when files change
   */
  onChange?: (files: File | File[] | null) => void;

  /**
   * Visual variant of the file input
   * @default 'button'
   */
  variant?: FileInputVariant;

  /**
   * Label for the file input
   */
  label?: ReactNode;

  /**
   * Description text
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the file input
   * @default 'md'
   */
  size?: Size;

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
   * Placeholder text for dropzone
   */
  placeholder?: string;

  /**
   * Button text for button variant
   */
  buttonText?: string;

  /**
   * Accepted file types (MIME types or extensions)
   */
  accept?: string[];

  /**
   * Whether to allow multiple files
   * @default false
   */
  multiple?: boolean;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Minimum file size in bytes
   */
  minSize?: number;

  /**
   * Maximum number of files (for multiple)
   */
  maxFiles?: number;

  /**
   * Custom file validator function
   */
  validator?: (file: File) => string | null;

  /**
   * Whether to show file preview
   * @default true
   */
  showPreview?: boolean;

  /**
   * Whether to show file size
   * @default true
   */
  showFileSize?: boolean;

  /**
   * Whether to show upload progress
   * @default false
   */
  showProgress?: boolean;

  /**
   * Upload progress percentage (0-100)
   */
  progress?: number;

  /**
   * Custom icon for the file input
   */
  icon?: ReactElement;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Custom height for dropzone
   */
  height?: number;

  /**
   * Callback when files are dropped
   */
  onDrop?: (files: File[]) => void;

  /**
   * Callback when drag enters
   */
  onDragEnter?: () => void;

  /**
   * Callback when drag leaves
   */
  onDragLeave?: () => void;

  /**
   * Callback when file is removed
   */
  onRemove?: (file: File, index?: number) => void;

  /**
   * Custom styles for different parts
   */
  styles?: {
    wrapper?: string;
    input?: string;
    button?: string;
    dropzone?: string;
    preview?: string;
    error?: string;
  };

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Custom loading text
   */
  loadingText?: string;
}
