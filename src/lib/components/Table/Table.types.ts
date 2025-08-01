import {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type TableVariant =
  | "default"
  | "striped"
  | "bordered"
  | "minimal"
  | "elevated";
export type TableSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SortDirection = "asc" | "desc";
export type SelectionMode = "single" | "multiple" | "none";
export type TableDensity = "compact" | "comfortable" | "spacious";

export interface TableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  accessor: keyof T | string;

  /**
   * Column header title
   */
  title?: ReactNode;

  /**
   * Column width (CSS value)
   */
  width?: string | number;

  /**
   * Minimum column width
   */
  minWidth?: string | number;

  /**
   * Maximum column width
   */
  maxWidth?: string | number;

  /**
   * Whether column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Whether column is resizable
   * @default false
   */
  resizable?: boolean;

  /**
   * Whether column can be hidden
   * @default true
   */
  hideable?: boolean;

  /**
   * Whether column is initially hidden
   * @default false
   */
  hidden?: boolean;

  /**
   * Column alignment
   * @default 'left'
   */
  textAlign?: "left" | "center" | "right";

  /**
   * Custom cell renderer
   */
  render?: (value: any, record: T, index: number) => ReactNode;

  /**
   * Custom header renderer
   */
  renderHeader?: (column: TableColumn<T>) => ReactNode;

  /**
   * Custom footer renderer
   */
  renderFooter?: (column: TableColumn<T>, data: T[]) => ReactNode;

  /**
   * Whether column is pinned
   */
  pinned?: "left" | "right";

  /**
   * Custom cell props
   */
  cellProps?: (
    record: T,
    index: number
  ) => TdHTMLAttributes<HTMLTableCellElement>;

  /**
   * Custom header props
   */
  headerProps?: ThHTMLAttributes<HTMLTableHeaderCellElement>;

  /**
   * Column group (for grouping headers)
   */
  group?: string;

  /**
   * Custom CSS class for column
   */
  className?: string;

  /**
   * Whether column should be sticky
   */
  sticky?: boolean;

  /**
   * Custom filter component
   */
  filter?: ReactElement;

  /**
   * Whether column is filterable
   */
  filterable?: boolean;

  /**
   * Custom sort function
   */
  sortFunction?: (a: T, b: T) => number;
}

export interface TablePagination {
  /**
   * Current page (1-indexed)
   */
  page: number;

  /**
   * Items per page
   */
  pageSize: number;

  /**
   * Total number of items
   */
  total: number;

  /**
   * Available page sizes
   */
  pageSizes?: number[];

  /**
   * Whether to show page size selector
   * @default true
   */
  showPageSizeSelector?: boolean;

  /**
   * Whether to show page info
   * @default true
   */
  showPageInfo?: boolean;

  /**
   * Custom page info formatter
   */
  pageInfoFormatter?: (page: number, pageSize: number, total: number) => string;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Callback when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void;
}

export interface TableSort<T = any> {
  /**
   * Column accessor to sort by
   */
  columnAccessor: keyof T | string;

  /**
   * Sort direction
   */
  direction: SortDirection;
}

export interface TableSelection<T = any> {
  /**
   * Selection mode
   * @default 'none'
   */
  mode: SelectionMode;

  /**
   * Selected record IDs
   */
  selectedRecords: (string | number)[];

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedRecords: (string | number)[]) => void;

  /**
   * Function to get record ID
   */
  getRecordId?: (record: T, index: number) => string | number;

  /**
   * Whether to show select all checkbox
   * @default true
   */
  showSelectAll?: boolean;

  /**
   * Custom selection column width
   */
  selectionColumnWidth?: string | number;
}

export interface TableProps<T = any>
  extends BaseComponentProps,
    Omit<HTMLAttributes<HTMLTableElement>, "children"> {
  /**
   * Table data
   */
  data: T[];

  /**
   * Table columns configuration
   */
  columns: TableColumn<T>[];

  /**
   * Table variant
   * @default 'default'
   */
  variant?: TableVariant;

  /**
   * Table size
   * @default 'md'
   */
  size?: TableSize;

  /**
   * Table density (row spacing)
   * @default 'comfortable'
   */
  density?: TableDensity;

  /**
   * Whether table has borders
   * @default false
   */
  withBorder?: boolean;

  /**
   * Whether to show column borders
   * @default false
   */
  withColumnBorders?: boolean;

  /**
   * Whether rows are striped
   * @default false
   */
  striped?: boolean;

  /**
   * Whether rows are hoverable
   * @default true
   */
  hoverable?: boolean;

  /**
   * Custom row height
   */
  rowHeight?: number;

  /**
   * Table height (for virtual scrolling)
   */
  height?: number | string;

  /**
   * Whether to enable virtual scrolling
   * @default false
   */
  virtualScrolling?: boolean;

  /**
   * Pagination configuration
   */
  pagination?: TablePagination;

  /**
   * Sort configuration
   */
  sort?: TableSort<T>;

  /**
   * Callback when sort changes
   */
  onSortChange?: (sort: TableSort<T> | null) => void;

  /**
   * Selection configuration
   */
  selection?: TableSelection<T>;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Number of skeleton rows to show when loading
   * @default 5
   */
  loadingRows?: number;

  /**
   * Empty state content
   */
  emptyState?: ReactNode;

  /**
   * Error state content
   */
  errorState?: ReactNode;

  /**
   * Whether table is in error state
   * @default false
   */
  error?: boolean;

  /**
   * Custom row props
   */
  rowProps?: (record: T, index: number) => HTMLAttributes<HTMLTableRowElement>;

  /**
   * Callback when row is clicked
   */
  onRowClick?: (record: T, index: number) => void;

  /**
   * Callback when row is double clicked
   */
  onRowDoubleClick?: (record: T, index: number) => void;

  /**
   * Custom table caption
   */
  caption?: ReactNode;

  /**
   * Whether to show table footer
   * @default false
   */
  withFooter?: boolean;

  /**
   * Custom footer content
   */
  footer?: ReactNode;

  /**
   * Whether columns are resizable
   * @default false
   */
  resizable?: boolean;

  /**
   * Whether columns can be reordered
   * @default false
   */
  reorderable?: boolean;

  /**
   * Callback when columns are reordered
   */
  onColumnsReorder?: (columns: TableColumn<T>[]) => void;

  /**
   * Whether to show column visibility controls
   * @default false
   */
  withColumnVisibility?: boolean;

  /**
   * Custom styles for different parts
   */
  styles?: {
    root?: string;
    table?: string;
    header?: string;
    body?: string;
    row?: string;
    cell?: string;
    footer?: string;
    pagination?: string;
    emptyState?: string;
    loadingOverlay?: string;
  };

  /**
   * Whether to enable row expansion
   * @default false
   */
  expandable?: boolean;

  /**
   * Expanded row IDs
   */
  expandedRecords?: (string | number)[];

  /**
   * Callback when row expansion changes
   */
  onExpandedRecordsChange?: (expandedRecords: (string | number)[]) => void;

  /**
   * Custom expanded row renderer
   */
  renderExpandedRow?: (record: T, index: number) => ReactNode;

  /**
   * Whether to enable filtering
   * @default false
   */
  filterable?: boolean;

  /**
   * Current filters
   */
  filters?: Record<string, any>;

  /**
   * Callback when filters change
   */
  onFiltersChange?: (filters: Record<string, any>) => void;

  /**
   * Whether to enable search
   * @default false
   */
  searchable?: boolean;

  /**
   * Search query
   */
  searchQuery?: string;

  /**
   * Callback when search changes
   */
  onSearchChange?: (query: string) => void;

  /**
   * Custom search placeholder
   */
  searchPlaceholder?: string;

  /**
   * Whether to highlight search matches
   * @default true
   */
  highlightSearch?: boolean;

  /**
   * Custom no data message
   */
  noDataMessage?: string;

  /**
   * Whether table is responsive
   * @default true
   */
  responsive?: boolean;

  /**
   * Breakpoint for responsive behavior
   */
  responsiveBreakpoint?: string;

  /**
   * Whether to enable keyboard navigation
   * @default true
   */
  keyboardNavigation?: boolean;

  /**
   * Custom loading overlay
   */
  loadingOverlay?: ReactNode;

  /**
   * Animation duration for transitions
   * @default 200
   */
  animationDuration?: number;
}
