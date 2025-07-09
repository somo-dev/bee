import { Size } from "../../types/common";
import { AccordionVariant } from "./Accordion.types";

export const accordionVariants: Record<
  AccordionVariant,
  {
    root: string;
    item: string;
    trigger: string;
    content: string;
    separator: string;
  }
> = {
  default: {
    root: "space-y-0",
    item: "border-b border-gray-200 last:border-b-0",
    trigger: `
      w-full px-4 py-4 text-left bg-white hover:bg-gray-50
      transition-colors duration-200 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
    `,
    content: `
      px-4 pb-4 bg-white text-gray-700 leading-relaxed
      overflow-hidden
    `,
    separator: "border-gray-200",
  },
  filled: {
    root: "space-y-2",
    item: "bg-gray-50 rounded-lg overflow-hidden border border-gray-200",
    trigger: `
      w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100
      transition-colors duration-200 ease-out rounded-lg
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50
    `,
    content: `
      px-4 pb-4 bg-white text-gray-700 leading-relaxed
      border-t border-gray-200 rounded-b-lg overflow-hidden
    `,
    separator: "border-gray-200",
  },
  separated: {
    root: "space-y-4",
    item: "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200",
    trigger: `
      w-full px-6 py-4 text-left bg-white hover:bg-gray-50
      transition-colors duration-200 ease-out rounded-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
    `,
    content: `
      px-6 pb-6 bg-white text-gray-700 leading-relaxed
      border-t border-gray-100 overflow-hidden
    `,
    separator: "border-gray-200",
  },
  contained: {
    root: "bg-gray-50 rounded-xl p-4 space-y-3",
    item: "bg-white rounded-lg border border-gray-200 shadow-sm",
    trigger: `
      w-full px-4 py-3 text-left bg-white hover:bg-blue-50
      transition-colors duration-200 ease-out rounded-lg
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
    `,
    content: `
      px-4 pb-4 bg-white text-gray-700 leading-relaxed
      border-t border-gray-100 overflow-hidden
    `,
    separator: "border-gray-200",
  },
  minimal: {
    root: "space-y-0",
    item: "border-b border-gray-100 last:border-b-0",
    trigger: `
      w-full px-2 py-3 text-left hover:bg-gray-50
      transition-colors duration-200 ease-out rounded-md
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
    `,
    content: `
      px-2 pb-4 text-gray-700 leading-relaxed overflow-hidden
    `,
    separator: "border-gray-100",
  },
};

export const accordionSizes: Record<
  Size,
  {
    trigger: string;
    content: string;
    text: string;
    icon: string;
    chevron: string;
    spacing: string;
  }
> = {
  sm: {
    trigger: "px-3 py-2 text-sm",
    content: "px-3 pb-3 text-sm",
    text: "text-sm",
    icon: "w-4 h-4",
    chevron: "w-4 h-4",
    spacing: "gap-2",
  },
  md: {
    trigger: "px-4 py-3 text-base",
    content: "px-4 pb-4 text-sm",
    text: "text-base",
    icon: "w-5 h-5",
    chevron: "w-5 h-5",
    spacing: "gap-3",
  },
  lg: {
    trigger: "px-6 py-4 text-lg",
    content: "px-6 pb-6 text-base",
    text: "text-lg",
    icon: "w-6 h-6",
    chevron: "w-6 h-6",
    spacing: "gap-4",
  },
  xl: {
    trigger: "px-8 py-5 text-xl",
    content: "px-8 pb-8 text-lg",
    text: "text-xl",
    icon: "w-7 h-7",
    chevron: "w-7 h-7",
    spacing: "gap-5",
  },
};

export const baseTriggerStyles = `
  flex items-center justify-between
  font-medium text-gray-900
  cursor-pointer select-none
  group
`;

export const baseContentStyles = `
  transition-all duration-300 ease-out
`;

export const chevronStyles = `
  text-gray-400 transition-transform duration-300 ease-out
  group-hover:text-gray-600 flex-shrink-0
`;

export const openChevronStyles = `
  transform rotate-180
`;

export const loadingSpinnerStyles = `
  animate-spin text-blue-500
`;

export const dragHandleStyles = `
  opacity-0 group-hover:opacity-100 transition-opacity duration-200
  cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600
`;

export const searchInputStyles = `
  w-full px-4 py-3 border border-gray-300 rounded-lg
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition-all duration-200 placeholder-gray-400
`;

export const expandAllButtonStyles = `
  px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700
  hover:bg-blue-50 rounded-md transition-all duration-200
  focus:outline-none
`;

export const itemNumberStyles = `
  inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600
  rounded-full text-xs font-medium flex-shrink-0
`;

export const highlightStyles = `
  bg-yellow-200 text-yellow-900 px-1 rounded
`;

export const emptyStateStyles = `
  flex flex-col items-center justify-center py-12 text-gray-500
`;

export const rightSectionStyles = `
  flex items-center gap-2 ml-auto mr-2
`;

export const avatarStyles = `
  w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
  flex items-center justify-center text-white font-semibold text-sm
  flex-shrink-0
`;

export const nameStyles = `
  font-medium text-gray-900 text-base
`;

export const descriptionStyles = `
  text-gray-500 text-sm mt-0.5
`;

export const contentWrapperStyles = `
  flex-1 min-w-0
`;
