import { ReactNode, InputHTMLAttributes } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type CheckboxVariant = "default" | "filled" | "outline";

export interface CheckboxProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /**
   * Current checked state
   */
  checked?: boolean;

  /**
   * Whether the checkbox is in an indeterminate state
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Callback when checkbox state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Label text for the checkbox
   */
  label?: ReactNode;

  /**
   * Description text below the label
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the checkbox
   * @default 'default'
   */
  variant?: CheckboxVariant;

  /**
   * Custom color for the checkbox
   */
  color?: string;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is required
   * @default false
   */
  required?: boolean;

  /**
   * Position of the label relative to the checkbox
   * @default 'right'
   */
  labelPosition?: "left" | "right";

  /**
   * Custom icon for checked state
   */
  icon?: ReactNode;

  /**
   * Custom icon for indeterminate state
   */
  indeterminateIcon?: ReactNode;
}

export interface CheckboxGroupProps extends BaseComponentProps {
  /**
   * Array of checkbox values that are currently selected
   */
  value?: string[];

  /**
   * Callback when selection changes
   */
  onChange?: (value: string[]) => void;

  /**
   * Array of checkbox options
   */
  children: ReactNode;

  /**
   * Label for the checkbox group
   */
  label?: ReactNode;

  /**
   * Description for the checkbox group
   */
  description?: ReactNode;

  /**
   * Error message for the checkbox group
   */
  error?: ReactNode;

  /**
   * Whether the group is required
   * @default false
   */
  required?: boolean;

  /**
   * Size for all checkboxes in the group
   * @default 'md'
   */
  size?: Size;

  /**
   * Variant for all checkboxes in the group
   * @default 'default'
   */
  variant?: CheckboxVariant;

  /**
   * Whether all checkboxes in the group are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Layout orientation
   * @default 'vertical'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Spacing between checkboxes
   * @default 'md'
   */
  spacing?: Size;
}
