import { ReactElement } from 'react';
import { Size, Variant, BaseComponentProps } from "../index";

export type PaginationVariant = 'default' | 'outline' | 'minimal' | 'pills';

export interface PaginationProps extends BaseComponentProps {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;
  
  /**
   * Total number of pages
   */
  totalPages: number;
  
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  
  /**
   * Visual variant of the pagination
   * @default 'default'
   */
  variant?: PaginationVariant;
  
  /**
   * Size of the pagination
   * @default 'md'
   */
  size?: Size;
  
  /**
   * Number of page buttons to show around current page
   * @default 2
   */
  siblingCount?: number;
  
  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;
  
  /**
   * Whether to show previous/next buttons
   * @default true
   */
  showPrevNext?: boolean;
  
  /**
   * Whether to show page info (e.g., "Page 1 of 10")
   * @default false
   */
  showPageInfo?: boolean;
  
  /**
   * Whether to show jump to page input
   * @default false
   */
  showJumpTo?: boolean;
  
  /**
   * Custom labels for buttons
   */
  labels?: {
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
    jumpTo?: string;
    pageInfo?: string;
  };
  
  /**
   * Custom icons for navigation buttons
   */
  icons?: {
    previous?: ReactElement;
    next?: ReactElement;
    first?: ReactElement;
    last?: ReactElement;
  };
  
  /**
   * Whether the pagination is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to show ellipsis for truncated pages
   * @default true
   */
  showEllipsis?: boolean;
}
