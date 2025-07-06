import { ReactNode } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export interface ColorPickerProps extends BaseComponentProps {
  /**
   * Current color value
   */
  value: string;

  /**
   * Callback when color changes
   */
  onChange: (color: string) => void;

  /**ac
   * Label for the color picker
   */
  label?: string;

  /**
   * Size of the color picker
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the color picker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Predefined colors to show
   */
  predefinedColors?: string[];

  /**
   * Whether to show the custom color picker
   * @default true
   */
  showCustomPicker?: boolean;

  /**
   * Whether to show predefined colors
   * @default true
   */
  showPredefinedColors?: boolean;

  /**
   * Number of columns for predefined colors grid
   * @default 6
   */
  colorGridColumns?: number;

  /**
   * Placeholder text for hex input
   * @default '#000000'
   */
  placeholder?: string;

  /**
   * Custom trigger element
   */
  trigger?: ReactNode;
}
