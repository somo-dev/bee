import { ReactNode, ReactElement } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type SegmentedControlVariant =
  | "default"
  | "pills"
  | "outline"
  | "minimal";
export type SegmentedControlOrientation = "horizontal" | "vertical";
export type SegmentedControlRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "full";

export interface SegmentedControlItem {
  /**
   * Unique value for this segment
   */
  value: string;

  /**
   * Label to display
   */
  label: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactElement;

  /**
   * Whether this segment is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional description for accessibility
   */
  description?: string;

  /**
   * Custom color for this segment
   */
  color?: string;

  /**
   * Badge or additional content
   */
  badge?: ReactNode;
}

export interface SegmentedControlProps extends BaseComponentProps {
  /**
   * Array of segment items
   */
  data: SegmentedControlItem[] | string[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: SegmentedControlVariant;

  /**
   * Size of the control
   * @default 'md'
   */
  size?: Size;

  /**
   * Orientation of segments
   * @default 'horizontal'
   */
  orientation?: SegmentedControlOrientation;

  /**
   * Border radius
   * @default 'md'
   */
  radius?: SegmentedControlRadius;

  /**
   * Whether the control is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the control takes full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom color for active segment
   */
  color?: string;

  /**
   * Whether to show transition animations
   * @default true
   */
  transitionDuration?: number;

  /**
   * Custom styles for different parts
   */
  styles?: {
    root?: string;
    segment?: string;
    activeSegment?: string;
    label?: string;
    indicator?: string;
  };

  /**
   * Whether segments should be equal width
   * @default true
   */
  equalWidth?: boolean;

  /**
   * Custom indicator element
   */
  indicator?: ReactElement;

  /**
   * Whether to show icons
   * @default true
   */
  showIcons?: boolean;

  /**
   * Position of icons relative to labels
   * @default 'left'
   */
  iconPosition?: "left" | "right" | "top" | "bottom";

  /**
   * Whether to allow deselection
   * @default false
   */
  allowDeselect?: boolean;

  /**
   * Callback when a segment is clicked
   */
  onSegmentClick?: (item: SegmentedControlItem, index: number) => void;
}
