import { Size } from "../../types/common";

export const colorPickerSizes: Record<
  Size,
  {
    colorBox: string;
    input: string;
    trigger: string;
    icon: string;
  }
> = {
  sm: {
    colorBox: "w-6 h-6",
    input: "h-8 px-2 text-sm",
    trigger: "w-8 h-8",
    icon: "w-3 h-3",
  },
  md: {
    colorBox: "w-8 h-8",
    input: "h-10 px-3 text-sm",
    trigger: "w-10 h-10",
    icon: "w-4 h-4",
  },
  lg: {
    colorBox: "w-10 h-10",
    input: "h-12 px-4 text-base",
    trigger: "w-12 h-12",
    icon: "w-5 h-5",
  },
  xl: {
    colorBox: "w-12 h-12",
    input: "h-14 px-5 text-lg",
    trigger: "w-14 h-14",
    icon: "w-6 h-6",
  },
};

export const popoverStyles = `
  absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]
`;

export const colorBoxStyles = `
  rounded border-2 transition-all cursor-pointer hover:scale-105
`;

export const selectedColorBoxStyles = `
  border-gray-800 scale-110 shadow-md
`;

export const defaultColorBoxStyles = `
  border-gray-200 hover:border-gray-400
`;

export const triggerButtonStyles = `
  rounded border-2 border-gray-200 hover:border-gray-400 transition-colors bg-white flex items-center justify-center cursor-pointer
`;

export const hexInputStyles = `
  w-full px-3 py-2 border border-gray-300 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
`;

export const headerStyles = `
  flex items-center justify-between mb-3
`;

export const labelStyles = `
  text-sm font-medium text-gray-700
`;

export const closeButtonStyles = `
  text-gray-400 hover:text-gray-600 transition-colors
`;
