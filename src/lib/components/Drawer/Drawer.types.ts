import { ReactNode, ReactElement } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type DrawerPosition = "left" | "right" | "top" | "bottom";
export type DrawerVariant = "default" | "overlay" | "push" | "mini";

export interface DrawerProps extends BaseComponentProps {
  /**
   * Whether the drawer is open
   */
  opened: boolean;

  /**
   * Callback when drawer should close
   */
  onClose: () => void;

  /**
   * Position of the drawer
   * @default 'left'
   */
  position?: DrawerPosition;

  /**
   * Size of the drawer
   * @default 'md'
   */
  size?: Size | number;

  /**
   * Visual variant of the drawer
   * @default 'default'
   */
  variant?: DrawerVariant;

  /**
   * Custom color for the drawer
   */
  color?: string;

  /**
   * Title of the drawer
   */
  title?: ReactNode;

  /**
   * Whether to show close button
   * @default true
   */
  withCloseButton?: boolean;

  /**
   * Whether clicking overlay closes drawer
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether pressing escape closes drawer
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to trap focus within drawer
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Whether to show overlay backdrop
   * @default true
   */
  withOverlay?: boolean;

  /**
   * Custom overlay opacity
   * @default 0.6
   */
  overlayOpacity?: number;

  /**
   * Custom overlay color
   * @default '#000000'
   */
  overlayColor?: string;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;

  /**
   * Custom z-index
   * @default 1000
   */
  zIndex?: number;

  /**
   * Whether drawer is resizable
   * @default false
   */
  resizable?: boolean;

  /**
   * Minimum size when resizable
   */
  minSize?: number;

  /**
   * Maximum size when resizable
   */
  maxSize?: number;

  /**
   * Custom header content
   */
  header?: ReactNode;

  /**
   * Custom footer content
   */
  footer?: ReactNode;

  /**
   * Whether to show shadow
   * @default true
   */
  withShadow?: boolean;

  /**
   * Custom border radius
   */
  radius?: number;

  /**
   * Whether to lock body scroll when open
   * @default true
   */
  lockScroll?: boolean;

  /**
   * Custom styles for different parts
   */
  styles?: {
    root?: string;
    overlay?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
    closeButton?: string;
  };

  /**
   * Callback when drawer starts opening
   */
  onOpen?: () => void;

  /**
   * Callback when drawer finishes opening
   */
  onOpened?: () => void;

  /**
   * Callback when drawer starts closing
   */
  onClosing?: () => void;

  /**
   * Callback when drawer finishes closing
   */
  onClosed?: () => void;

  /**
   * Custom close icon
   */
  closeIcon?: ReactElement;

  /**
   * Whether drawer content should scroll
   * @default true
   */
  scrollable?: boolean;

  /**
   * Custom padding for drawer content
   */
  padding?: Size | number;
}
