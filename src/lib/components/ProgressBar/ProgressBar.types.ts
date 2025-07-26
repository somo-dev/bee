import { ReactNode, HTMLAttributes } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type ProgressBarVariant = "default" | "striped" | "gradient" | "rounded";

export interface ProgressBarProps
  extends BaseComponentProps,
    Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Current progress value
   */
  value: number;

  /**
   * Maximum value for the progress bar
   * @default 100
   */
  max?: number;

  /**
   * Minimum value for the progress bar
   * @default 0
   */
  min?: number;

  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the progress bar
   * @default 'default'
   */
  variant?: ProgressBarVariant;

  /**
   * Custom color for the progress bar
   */
  color?: string;

  /**
   * Background color of the track
   */
  trackColor?: string;

  /**
   * Whether to show striped pattern
   * @default false
   */
  striped?: boolean;

  /**
   * Whether to animate the stripes
   * @default false
   */
  animated?: boolean;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Whether the progress bar is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label to display inside or outside the progress bar
   */
  label?: ReactNode;

  /**
   * Position of the label
   * @default 'inside'
   */
  labelPosition?: "inside" | "outside" | "none";

  /**
   * Whether to show percentage
   * @default false
   */
  showPercentage?: boolean;

  /**
   * Custom percentage formatter
   */
  formatPercentage?: (value: number, max: number) => string;

  /**
   * Whether to show value text
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom value formatter
   */
  formatValue?: (value: number, max: number) => string;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;

  /**
   * Whether to use smooth transitions
   * @default true
   */
  smoothTransition?: boolean;

  /**
   * Custom gradient colors (for gradient variant)
   */
  gradientColors?: [string, string];

  /**
   * Whether the progress bar should pulse when complete
   * @default false
   */
  pulseOnComplete?: boolean;

  /**
   * Callback when progress reaches maximum
   */
  onComplete?: () => void;

  /**
   * Callback when progress value changes
   */
  onValueChange?: (value: number, percentage: number) => void;

  /**
   * Custom styles for different parts
   */
  styles?: {
    container?: string;
    track?: string;
    fill?: string;
    label?: string;
    stripes?: string;
  };

  /**
   * Whether to show a glow effect
   * @default false
   */
  glow?: boolean;

  /**
   * Thickness of the progress bar (overrides size)
   */
  thickness?: number;

  /**
   * Whether the progress bar is indeterminate
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Custom aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;
}
