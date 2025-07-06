import { ReactNode, ReactElement } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export interface TransferListItem {
  /**
   * Unique identifier for the item
   */
  value: string | number;

  /**
   * Display label for the item
   */
  label: ReactNode;

  /**
   * Optional description for the item
   */
  description?: string;

  /**
   * Optional icon for the item
   */
  icon?: ReactElement;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional group this item belongs to
   */
  group?: string;

  /**
   * Optional metadata for the item
   */
  metadata?: Record<string, any>;
}

export interface TransferListGroup {
  /**
   * Group identifier
   */
  id: string;

  /**
   * Group label
   */
  label: string;

  /**
   * Items in this group
   */
  items: TransferListItem[];
}

export type TransferListVariant = "default" | "bordered" | "elevated";

export interface TransferListProps extends BaseComponentProps {
  /**
   * All available items
   */
  data: TransferListItem[] | TransferListGroup[];

  /**
   * Currently selected items (right side)
   */
  value?: (string | number)[];

  /**
   * Callback when selection changes
   */
  onChange?: (value: (string | number)[]) => void;

  /**
   * Labels for the two lists
   */
  titles?: [string, string];

  /**
   * Descriptions for the two lists
   */
  descriptions?: [string, string];

  /**
   * Size of the transfer list
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: TransferListVariant;

  /**
   * Whether items are searchable
   * @default true
   */
  searchable?: boolean;

  /**
   * Whether items are sortable within lists
   * @default true
   */
  sortable?: boolean;

  /**
   * Whether to show item counts
   * @default true
   */
  showCounts?: boolean;

  /**
   * Whether to show transfer all buttons
   * @default true
   */
  showTransferAll?: boolean;

  /**
   * Whether to show group headers
   * @default true
   */
  showGroups?: boolean;

  /**
   * Maximum height of each list
   * @default 400
   */
  listHeight?: number;

  /**
   * Custom search filter function
   */
  filter?: (query: string, item: TransferListItem) => boolean;

  /**
   * Custom sort function
   */
  sortFunction?: (a: TransferListItem, b: TransferListItem) => number;

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show selection checkboxes
   * @default true
   */
  showCheckboxes?: boolean;

  /**
   * Custom placeholder for search inputs
   */
  searchPlaceholder?: string;

  /**
   * Custom empty state messages
   */
  emptyState?: {
    available?: ReactNode;
    selected?: ReactNode;
  };

  /**
   * Custom transfer button icons
   */
  transferIcons?: {
    moveRight?: ReactElement;
    moveLeft?: ReactElement;
    moveAllRight?: ReactElement;
    moveAllLeft?: ReactElement;
  };

  /**
   * Callback when items are reordered
   */
  onReorder?: (
    items: TransferListItem[],
    listType: "available" | "selected"
  ) => void;

  /**
   * Whether to preserve item order when transferring
   * @default false
   */
  preserveOrder?: boolean;
}
