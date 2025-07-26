import { ReactNode, CSSProperties, HTMLAttributes } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps
  extends BaseComponentProps,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Whether to show skeleton or content
   * @default true
   */
  loading?: boolean;

  /**
   * Content to show when not loading
   */
  children?: ReactNode;

  /**
   * Width of the skeleton
   */
  width?: number | string;

  /**
   * Height of the skeleton
   */
  height?: number | string;

  /**
   * Variant/shape of the skeleton
   * @default 'rectangular'
   */
  variant?: SkeletonVariant;

  /**
   * Animation type
   * @default 'wave'
   */
  animation?: SkeletonAnimation;

  /**
   * Size preset
   */
  size?: Size;

  /**
   * Custom border radius
   */
  radius?: number | string;

  /**
   * Base color of the skeleton
   * @default '#f3f4f6'
   */
  baseColor?: string;

  /**
   * Highlight color for shimmer
   * @default '#e5e7eb'
   */
  highlightColor?: string;

  /**
   * Animation duration in seconds
   * @default 1.5
   */
  duration?: number;

  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Number of skeleton lines (for text variant)
   * @default 1
   */
  lines?: number;

  /**
   * Whether the last line should be shorter (for text variant)
   * @default true
   */
  lastLineWidth?: number | string | boolean;

  /**
   * Spacing between lines (for text variant)
   * @default 8
   */
  lineSpacing?: number;

  /**
   * Whether to fade in content when loading completes
   * @default true
   */
  fadeIn?: boolean;

  /**
   * Fade in duration in milliseconds
   * @default 300
   */
  fadeInDuration?: number;

  /**
   * Custom styles for skeleton
   */
  skeletonStyle?: CSSProperties;

  /**
   * Custom styles for content wrapper
   */
  contentStyle?: CSSProperties;

  /**
   * Whether to maintain aspect ratio
   * @default false
   */
  aspectRatio?: number;

  /**
   * Whether to show skeleton on initial render
   * @default true
   */
  visible?: boolean;

  /**
   * Custom shimmer direction
   * @default 'ltr'
   */
  direction?: "ltr" | "rtl" | "ttb" | "btt";

  /**
   * Whether skeleton should be inline
   * @default false
   */
  inline?: boolean;

  /**
   * Callback when loading state changes
   */
  onLoadingChange?: (loading: boolean) => void;
}

export interface SkeletonGroupProps
  extends BaseComponentProps,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Whether to show skeletons or content
   * @default true
   */
  loading?: boolean;

  /**
   * Content to show when not loading
   */
  children?: ReactNode;

  /**
   * Number of skeleton items
   * @default 3
   */
  count?: number;

  /**
   * Spacing between skeleton items
   * @default 16
   */
  spacing?: number;

  /**
   * Props to pass to each skeleton
   */
  skeletonProps?: Omit<SkeletonProps, "loading" | "children">;

  /**
   * Whether to stagger animation delays
   * @default true
   */
  stagger?: boolean;

  /**
   * Stagger delay between items in seconds
   * @default 0.1
   */
  staggerDelay?: number;
}
