import { ReactNode, ReactElement } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type TimelineVariant = "default" | "filled" | "outline" | "minimal";
export type TimelineAlign = "left" | "right" | "center";
export type TimelineLineType = "solid" | "dashed" | "dotted";

export interface TimelineItem {
  /**
   * Unique identifier for the timeline item
   */
  id: string;

  /**
   * Title of the timeline item
   */
  title: ReactNode;

  /**
   * Description or content of the timeline item
   */
  description?: ReactNode;

  /**
   * Timestamp or date for the item
   */
  timestamp?: ReactNode;

  /**
   * Icon for the timeline bullet
   */
  icon?: ReactElement;

  /**
   * Custom color for this item's bullet
   */
  color?: string;

  /**
   * Whether this item is active/highlighted
   * @default false
   */
  active?: boolean;

  /**
   * Whether this item is completed
   * @default false
   */
  completed?: boolean;

  /**
   * Custom bullet size for this item
   */
  bulletSize?: number;

  /**
   * Additional content to render
   */
  children?: ReactNode;

  /**
   * Custom className for this item
   */
  className?: string;

  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom metadata
   */
  metadata?: Record<string, any>;
}

export interface TimelineProps extends BaseComponentProps {
  /**
   * Timeline items to display
   */
  items: TimelineItem[];

  /**
   * Visual variant of the timeline
   * @default 'default'
   */
  variant?: TimelineVariant;

  /**
   * Size of the timeline
   * @default 'md'
   */
  size?: Size;

  /**
   * Alignment of the timeline
   * @default 'left'
   */
  align?: TimelineAlign;

  /**
   * Color of the timeline line
   * @default '#e5e7eb'
   */
  lineColor?: string;

  /**
   * Width of the timeline line in pixels
   * @default 2
   */
  lineWidth?: number;

  /**
   * Type of the timeline line
   * @default 'solid'
   */
  lineType?: TimelineLineType;

  /**
   * Default color for timeline bullets
   * @default '#6366f1'
   */
  bulletColor?: string;

  /**
   * Default size for timeline bullets in pixels
   * @default 12
   */
  bulletSize?: number;

  /**
   * Whether to show connecting lines between items
   * @default true
   */
  showLine?: boolean;

  /**
   * Whether to show timestamps
   * @default true
   */
  showTimestamp?: boolean;

  /**
   * Whether the timeline is interactive (clickable items)
   * @default false
   */
  interactive?: boolean;

  /**
   * Whether to show item numbers/indices
   * @default false
   */
  showNumbers?: boolean;

  /**
   * Whether to reverse the timeline order
   * @default false
   */
  reverse?: boolean;

  /**
   * Custom spacing between items in pixels
   * @default 24
   */
  itemSpacing?: number;

  /**
   * Whether to animate items on scroll
   * @default false
   */
  animateOnScroll?: boolean;

  /**
   * Callback when an item is clicked (if interactive)
   */
  onItemClick?: (item: TimelineItem, index: number) => void;

  /**
   * Custom styles for different parts
   */
  styles?: {
    root?: string;
    item?: string;
    bullet?: string;
    content?: string;
    line?: string;
    timestamp?: string;
  };

  /**
   * Custom empty state when no items
   */
  emptyState?: ReactNode;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Number of skeleton items to show when loading
   * @default 3
   */
  loadingItems?: number;
}
