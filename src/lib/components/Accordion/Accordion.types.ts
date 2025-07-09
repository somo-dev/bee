import { ReactNode, ReactElement } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type AccordionVariant =
  | "default"
  | "filled"
  | "separated"
  | "contained"
  | "minimal";
export type AccordionChevronPosition = "left" | "right";
export type AccordionOrder = number[];

export interface AccordionItem {
  /**
   * Unique identifier for the accordion item
   */
  value: string;

  /**
   * The trigger content (usually the title)
   */
  label: ReactNode;

  /**
   * The collapsible content
   */
  content: ReactNode;

  /**
   * Optional description text below the label
   */
  description?: string;

  /**
   * Optional icon for the item
   */
  icon?: ReactElement;

  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom chevron icon for this item
   */
  chevron?: ReactElement;

  /**
   * Additional content to show in the header (badges, etc.)
   */
  rightSection?: ReactNode;

  /**
   * Custom styling for this item
   */
  className?: string;

  /**
   * Whether this item should be collapsible
   * @default true
   */
  collapsible?: boolean;
}

export interface AccordionProps extends BaseComponentProps {
  /**
   * Accordion items to display
   */
  items: AccordionItem[];

  /**
   * Currently opened item(s)
   * For single mode: string | null
   * For multiple mode: string[]
   */
  value?: string | string[] | null;

  /**
   * Callback when accordion state changes
   */
  onChange?: (value: string | string[] | null) => void;

  /**
   * Whether multiple items can be open at once
   * @default false
   */
  multiple?: boolean;

  /**
   * Whether items are collapsible (can be closed)
   * @default true
   */
  collapsible?: boolean;

  /**
   * Visual variant of the accordion
   * @default 'default'
   */
  variant?: AccordionVariant;

  /**
   * Size of the accordion
   * @default 'md'
   */
  size?: Size;

  /**
   * Position of the chevron icon
   * @default 'right'
   */
  chevronPosition?: AccordionChevronPosition;

  /**
   * Custom chevron icon
   */
  chevron?: ReactElement;

  /**
   * Whether to show chevron icons
   * @default true
   */
  showChevron?: boolean;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Whether the accordion is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Animation duration in milliseconds
   * @default 200
   */
  transitionDuration?: number;

  /**
   * Whether to loop focus when using keyboard navigation
   * @default true
   */
  loop?: boolean;

  /**
   * Custom order for accordion items
   */
  order?: AccordionOrder;

  /**
   * Whether items can be reordered via drag and drop
   * @default false
   */
  allowReorder?: boolean;

  /**
   * Callback when items are reordered
   */
  onReorder?: (newOrder: string[]) => void;

  /**
   * Whether to persist state in localStorage
   * @default false
   */
  persistent?: boolean;

  /**
   * Key for localStorage persistence
   */
  persistentKey?: string;

  /**
   * Whether to show item numbers/indices
   * @default false
   */
  showItemNumbers?: boolean;

  /**
   * Custom loading state for items
   */
  loading?: boolean | string[];

  /**
   * Custom empty state when no items
   */
  emptyState?: ReactNode;

  /**
   * Whether to enable search functionality
   * @default false
   */
  searchable?: boolean;

  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;

  /**
   * Custom search filter function
   */
  searchFilter?: (query: string, item: AccordionItem) => boolean;

  /**
   * Whether to highlight search matches
   * @default true
   */
  highlightMatches?: boolean;

  /**
   * Custom styles for different states
   */
  styles?: {
    root?: string;
    item?: string;
    trigger?: string;
    content?: string;
    chevron?: string;
  };

  /**
   * Whether to show expand/collapse all buttons
   * @default false
   */
  showExpandAll?: boolean;

  /**
   * Labels for expand/collapse all buttons
   */
  expandAllLabels?: {
    expand: string;
    collapse: string;
  };

  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: AccordionItem, isOpen: boolean) => void;

  /**
   * Whether to close other items when opening one (for multiple mode)
   * @default false
   */
  exclusive?: boolean;
}
