import { ReactNode, ReactElement, InputHTMLAttributes } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export interface SwitchProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /**
   * Current checked state
   */
  checked?: boolean;

  /**
   * Callback when switch state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Label for the switch
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
   * Size of the switch
   * @default 'md'
   */
  size?: Size;

  /**
   * Custom color for the switch when checked
   */
  color?: string;

  /**
   * Custom color for the switch when unchecked
   */
  offColor?: string;

  /**
   * Custom thumb color
   */
  thumbColor?: string;

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the switch is required
   * @default false
   */
  required?: boolean;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Position of the label relative to the switch
   * @default 'right'
   */
  labelPosition?: "left" | "right";

  /**
   * Icon or content to show when switch is ON
   */
  onLabel?: ReactElement;

  /**
   * Icon or content to show when switch is OFF
   */
  offLabel?: ReactElement;

  /**
   * Custom thumb icon (can be dynamic based on state)
   */
  thumbIcon?: ReactElement;

  /**
   * Whether to show inner labels
   * @default false
   */
  showInnerLabels?: boolean;

  /**
   * Custom animation duration in milliseconds
   * @default 200
   */
  animationDuration?: number;

  /**
   * Custom styles for different parts
   */
  styles?: {
    wrapper?: string;
    track?: string;
    thumb?: string;
    label?: string;
    innerLabel?: string;
  };
}
