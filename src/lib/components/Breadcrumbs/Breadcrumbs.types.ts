import { ReactElement, ReactNode } from 'react';
import { BaseComponentProps, Size } from '../../types/common';

export interface BreadcrumbItem {
  /**
   * The text or content to display for this breadcrumb item
   */
  label: ReactNode;
  
  /**
   * The URL or path this breadcrumb item links to
   * If not provided, the item will be rendered as plain text (typically for the current page)
   */
  href?: string;
  
  /**
   * Optional icon to display before the label
   */
  icon?: ReactElement;
  
  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;
}

export type BreadcrumbVariant = 'default' | 'pills' | 'minimal' | 'cards';
export type BreadcrumbSeparator = 'slash' | 'chevron' | 'arrow' | 'dot' | 'custom';

export interface BreadcrumbsProps extends BaseComponentProps {
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItem[];
  
  /**
   * Visual variant of the breadcrumbs
   * @default 'default'
   */
  variant?: BreadcrumbVariant;
  
  /**
   * Size of the breadcrumbs
   * @default 'md'
   */
  size?: Size;
  
  /**
   * Type of separator between breadcrumb items
   * @default 'chevron'
   */
  separator?: BreadcrumbSeparator;
  
  /**
   * Custom separator element (only used when separator is 'custom')
   */
  customSeparator?: ReactElement;
  
  /**
   * Maximum number of items to show before collapsing
   * Items in the middle will be replaced with an ellipsis
   */
  maxItems?: number;
  
  /**
   * Whether to show the home icon for the first item
   * @default false
   */
  showHomeIcon?: boolean;
  
  /**
   * Custom home icon (overrides default home icon)
   */
  homeIcon?: ReactElement;
  
  /**
   * Callback when a breadcrumb item is clicked
   */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}