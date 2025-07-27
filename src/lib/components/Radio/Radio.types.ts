import { ReactNode, InputHTMLAttributes } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type RadioVariant = "filled" | "outlined";

export interface RadioProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /**
   * Current checked state
   */
  checked?: boolean;

  /**
   * Callback when radio state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Label text for the radio
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
   * Size of the radio
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the radio
   * @default 'filled'
   */
  variant?: RadioVariant;

  /**
   * Custom color for the radio border/background
   */
  color?: string;

  /**
   * Custom color for the inner dot
   * Note: For outlined variant, the color prop controls both border and dot color
   */
  dotColor?: string;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Whether the radio is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the radio is required
   * @default false
   */
  required?: boolean;

  /**
   * Position of the label relative to the radio
   * @default 'right'
   */
  labelPosition?: "left" | "right";

  /**
   * Value for the radio (used in groups)
   */
  value?: string | number;
}

export interface RadioGroupProps extends BaseComponentProps {
  /**
   * Currently selected value
   */
  value?: string | number;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number) => void;

  /**
   * Array of radio options or children
   */
  children: ReactNode;

  /**
   * Label for the radio group
   */
  label?: ReactNode;

  /**
   * Description for the radio group
   */
  description?: ReactNode;

  /**
   * Error message for the radio group
   */
  error?: ReactNode;

  /**
   * Whether the group is required
   * @default false
   */
  required?: boolean;

  /**
   * Size for all radios in the group
   * @default 'md'
   */
  size?: Size;

  /**
   * Variant for all radios in the group
   * @default 'filled'
   */
  variant?: RadioVariant;

  /**
   * Whether all radios in the group are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Layout orientation
   * @default 'vertical'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Spacing between radios
   * @default 'md'
   */
  spacing?: Size;

  /**
   * Name attribute for all radios in the group
   */
  name?: string;
}
