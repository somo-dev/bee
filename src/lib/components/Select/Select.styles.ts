import { Size } from "../../types/common";
import { SelectVariant } from "./Select.types";

export const selectVariants: Record<
  SelectVariant,
  {
    input: string;
    dropdown: string;
  }
> = {
  default: {
    input: `
      bg-white border border-gray-300
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400
    `,
    dropdown: `
      bg-white border border-gray-200 shadow-lg
    `,
  },
  filled: {
    input: `
      bg-gray-50 border border-transparent
      hover:bg-gray-100
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-100 disabled:text-gray-400
    `,
    dropdown: `
      bg-white border border-gray-200 shadow-lg
    `,
  },
  unstyled: {
    input: `
      bg-transparent border-none
      focus:outline-none
    `,
    dropdown: `
      bg-white border border-gray-200 shadow-lg
    `,
  },
};

export const selectSizes: Record<
  Size,
  {
    input: string;
    text: string;
    icon: string;
    padding: string;
  }
> = {
  sm: {
    input: "h-8 text-sm",
    text: "text-sm",
    icon: "w-4 h-4",
    padding: "px-3 py-1",
  },
  md: {
    input: "h-10 text-sm",
    text: "text-sm",
    icon: "w-4 h-4",
    padding: "px-3 py-2",
  },
  lg: {
    input: "h-12 text-base",
    text: "text-base",
    icon: "w-5 h-5",
    padding: "px-4 py-3",
  },
  xl: {
    input: "h-14 text-lg",
    text: "text-lg",
    icon: "w-6 h-6",
    padding: "px-5 py-4",
  },
};

export const baseInputStyles = `
  w-full rounded-md transition-all duration-200 ease-in-out
  focus:outline-none
  cursor-pointer
  flex items-center justify-between
`;

export const dropdownStyles = `
  absolute z-50 w-full rounded-md overflow-hidden
  mt-1 max-h-60 overflow-y-auto
`;

export const optionStyles = `
  flex items-center justify-between px-3 py-2 cursor-pointer
  hover:bg-gray-50 transition-colors duration-150
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
`;

export const selectedOptionStyles = `
  bg-blue-50 text-blue-700 hover:bg-blue-100
`;

export const groupLabelStyles = `
  px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide
  bg-gray-50 border-b border-gray-100
`;

export const searchInputStyles = `
  w-full px-3 py-2 border-b border-gray-200
  focus:outline-none focus:border-blue-500
  text-sm placeholder-gray-400
`;

export const multiValueStyles = `
  inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800
  rounded text-xs font-medium max-w-[120px]
`;

export const clearButtonStyles = `
  p-1 hover:bg-gray-100 rounded transition-colors
  text-gray-400 hover:text-gray-600
`;

export const nothingFoundStyles = `
  px-3 py-8 text-center text-gray-500 text-sm
`;

export const checkmarkStyles = `
  text-blue-600 flex-shrink-0
`;
