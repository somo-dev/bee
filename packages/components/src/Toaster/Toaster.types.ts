import { ReactNode, ReactElement } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type ToastType = "info" | "success" | "warning" | "error" | "loading";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Toast {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Type of toast (determines color and icon)
   */
  type: ToastType;

  /**
   * Title of the toast
   */
  title?: string;

  /**
   * Message content
   */
  message: ReactNode;

  /**
   * Custom icon (overrides default type icon)
   */
  icon?: ReactElement;

  /**
   * Duration in milliseconds (0 = no auto-dismiss)
   * @default 4000
   */
  duration?: number;

  /**
   * Whether the toast can be dismissed manually
   * @default true
   */
  dismissible?: boolean;

  /**
   * Custom action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: () => void;

  /**
   * Custom className for this toast
   */
  className?: string;

  /**
   * Whether to show progress bar
   * @default false
   */
  showProgress?: boolean;

  /**
   * Custom metadata
   */
  metadata?: Record<string, any>;
}

export interface ToasterProps extends BaseComponentProps {
  /**
   * Array of toasts to display
   */
  toasts: Toast[];

  /**
   * Position of the toaster container
   * @default 'top-right'
   */
  position?: ToastPosition;

  /**
   * Maximum number of toasts to show
   * @default 5
   */
  maxToasts?: number;

  /**
   * Gap between toasts in pixels
   * @default 8
   */
  gap?: number;

  /**
   * Size of the toasts
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether to reverse the order (newest first)
   * @default false
   */
  reverseOrder?: boolean;

  /**
   * Custom container styles
   */
  containerStyle?: React.CSSProperties;

  /**
   * Whether to expand toasts on hover
   * @default true
   */
  expandOnHover?: boolean;

  /**
   * Custom offset from viewport edges
   */
  offset?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;

  /**
   * Whether to pause auto-dismiss on hover
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Whether to pause auto-dismiss when window loses focus
   * @default true
   */
  pauseOnFocusLoss?: boolean;

  /**
   * Custom toast renderer
   */
  renderToast?: (toast: Toast, index: number) => ReactNode;

  /**
   * Callback when a toast is dismissed
   */
  onDismiss?: (toastId: string) => void;
}

export interface ToastContextValue {
  /**
   * Add a new toast
   */
  addToast: (toast: Omit<Toast, "id">) => string;

  /**
   * Remove a toast by ID
   */
  removeToast: (id: string) => void;

  /**
   * Remove all toasts
   */
  clearToasts: () => void;

  /**
   * Update an existing toast
   */
  updateToast: (id: string, updates: Partial<Toast>) => void;

  /**
   * Current toasts
   */
  toasts: Toast[];
}

export interface ToastProviderProps {
  children: ReactNode;
  defaultPosition?: ToastPosition;
  maxToasts?: number;
  gap?: number;
  size?: Size;
}
