import { ButtonHTMLAttributes, ReactElement } from 'react';
import { Size, Variant, BaseComponentProps } from "../index";

export interface ButtonProps extends BaseComponentProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * The visual style variant of the button
   * @default 'primary'
   */
  variant?: Variant;
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: Size;
  
  /**
   * Custom color for the button (hex, rgb, rgba, or CSS color name)
   * Only applies to primary, outline, and danger variants
   */
  color?: string;
  
  /**
   * Whether the button should take the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactElement;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactElement;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Custom loading text to display when loading
   */
  loadingText?: string;
  
  /**
   * Whether only the icon should be displayed (no text)
   * @default false
   */
  iconOnly?: boolean;
}
