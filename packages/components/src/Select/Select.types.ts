import { ReactElement, ReactNode } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export interface SelectOption {
  /**
   * The value of the option
   */
  value: string | number;

  /**
   * The label to display for this option
   */
  label: ReactNode;

  /**
   * Optional description for the option
   */
  description?: string;

  /**
   * Whether this option is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional icon to display before the label
   */
  icon?: ReactElement;

  /**
   * Group this option belongs to
   */
  group?: string;
}

export interface SelectGroup {
  /**
   * The group label
   */
  label: string;

  /**
   * Options in this group
   */
  options: SelectOption[];
}

export type SelectVariant = "default" | "filled" | "unstyled";

export interface SelectProps extends BaseComponentProps {
  /**
   * Array of options or grouped options
   */
  data: SelectOption[] | SelectGroup[] | string[];

  /**
   * Current selected value(s)
   */
  value?: string | number | (string | number)[];

  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number | (string | number)[] | null) => void;

  /**
   * Placeholder text when no option is selected
   * @default 'Pick value'
   */
  placeholder?: string;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Description text below the select
   */
  description?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Size of the select
   * @default 'md'
   */
  size?: Size;

  /**
   * Visual variant of the select
   * @default 'default'
   */
  variant?: SelectVariant;

  /**
   * Whether the select is searchable
   * @default false
   */
  searchable?: boolean;

  /**
   * Whether the select is clearable
   * @default false
   */
  clearable?: boolean;

  /**
   * Whether to allow deselecting the current option
   * @default false
   */
  allowDeselect?: boolean;

  /**
   * Whether to allow multiple selections
   * @default false
   */
  multiple?: boolean;

  /**
   * Maximum number of selected items to display before showing count
   * @default 4
   */
  maxDisplayedValues?: number;

  /**
   * Text to show when no options match the search
   * @default 'Nothing found'
   */
  nothingFound?: string;

  /**
   * Custom search filter function
   */
  filter?: (value: string, item: SelectOption) => boolean;

  /**
   * Whether to show checkmarks beside selected options
   * @default true
   */
  showCheckmark?: boolean;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Maximum height of the dropdown
   * @default 220
   */
  maxDropdownHeight?: number;

  /**
   * Whether the dropdown should open upward
   * @default false
   */
  dropup?: boolean;

  /**
   * Custom icon for the dropdown arrow
   */
  rightSection?: ReactElement;

  /**
   * Whether to close dropdown on item select (for single select)
   * @default true
   */
  closeOnSelect?: boolean;
}
