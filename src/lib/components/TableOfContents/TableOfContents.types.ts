import { ReactNode, ReactElement } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export interface TableOfContentsItem {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Display label for the item
   */
  label: ReactNode;

  /**
   * Optional icon for the item
   */
  icon?: ReactElement;

  /**
   * Nesting level (0 = top level, 1 = nested, etc.)
   * @default 0
   */
  level?: number;

  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom href override (defaults to #${id})
   */
  href?: string;

  /**
   * Child items for nested structure
   */
  children?: TableOfContentsItem[];
}

export type TableOfContentsVariant =
  | "default"
  | "minimal"
  | "sidebar"
  | "floating";
export type TableOfContentsPosition = "left" | "right";

export interface TableOfContentsProps extends BaseComponentProps {
  /**
   * Array of table of contents items
   */
  items: TableOfContentsItem[];

  /**
   * Currently active section ID
   */
  activeId?: string;

  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: TableOfContentsItem) => void;

  /**
   * Visual variant of the table of contents
   * @default 'default'
   */
  variant?: TableOfContentsVariant;

  /**
   * Size of the component
   * @default 'md'
   */
  size?: Size;

  /**
   * Position of the table of contents
   * @default 'left'
   */
  position?: TableOfContentsPosition;

  /**
   * Height of the container
   * @default 'auto'
   */
  height?: number | string;

  /**
   * Gap between items in pixels
   * @default 4
   */
  itemGap?: number;

  /**
   * Whether to enable smooth scrolling
   * @default true
   */
  smoothScroll?: boolean;

  /**
   * Scroll offset for active detection
   * @default 100
   */
  scrollOffset?: number;

  /**
   * Whether to auto-detect active section based on scroll
   * @default true
   */
  autoDetectActive?: boolean;

  /**
   * Whether to show icons
   * @default true
   */
  showIcons?: boolean;

  /**
   * Whether to show nested items
   * @default true
   */
  showNested?: boolean;

  /**
   * Maximum nesting level to display
   * @default 3
   */
  maxLevel?: number;

  /**
   * Whether the component is sticky
   * @default false
   */
  sticky?: boolean;

  /**
   * Top offset for sticky positioning
   * @default 20
   */
  stickyTop?: number;

  /**
   * Custom scroll container selector
   * @default window
   */
  scrollContainer?: string;

  /**
   * Whether to highlight the active item
   * @default true
   */
  highlightActive?: boolean;

  /**
   * Custom styles for different parts
   */
  styles?: {
    container?: string;
    item?: string;
    activeItem?: string;
    nestedItem?: string;
    icon?: string;
    label?: string;
  };

  /**
   * Custom title for the table of contents
   */
  title?: ReactNode;

  /**
   * Whether to show the title
   * @default true
   */
  showTitle?: boolean;

  /**
   * Whether to collapse nested items by default
   * @default false
   */
  collapsible?: boolean;

  /**
   * Whether to show item numbers
   * @default false
   */
  showNumbers?: boolean;
}
