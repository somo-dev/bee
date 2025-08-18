import { Size, Variant, BaseComponentProps } from "../index";
import { TransferListVariant } from "./TransferList.types";

export const transferListVariants: Record<
  TransferListVariant,
  {
    container: string;
    list: string;
    item: string;
    selectedItem: string;
    header: string;
  }
> = {
  default: {
    container: "bg-white border border-gray-200 rounded-lg",
    list: "bg-gray-50 border border-gray-200 rounded-md",
    item: `
      flex items-center gap-3 p-3 border-b border-gray-100 last:border-b-0
      hover:bg-white transition-all duration-200 cursor-pointer
      group relative
    `,
    selectedItem: `
      bg-blue-50 border-blue-200 text-blue-900
      hover:bg-blue-100
    `,
    header:
      "bg-gray-100 border-b border-gray-200 p-4 font-medium text-gray-900",
  },
  bordered: {
    container: "bg-white border-2 border-gray-300 rounded-lg shadow-sm",
    list: "bg-white border-2 border-gray-300 rounded-md",
    item: `
      flex items-center gap-3 p-3 border-b-2 border-gray-100 last:border-b-0
      hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 cursor-pointer
      group relative
    `,
    selectedItem: `
      bg-blue-50 border-blue-300 text-blue-900
      hover:bg-blue-100 hover:border-blue-400
    `,
    header:
      "bg-gray-50 border-b-2 border-gray-300 p-4 font-semibold text-gray-900",
  },
  elevated: {
    container: "bg-white border border-gray-200 rounded-xl shadow-lg",
    list: "bg-white border border-gray-200 rounded-lg shadow-md",
    item: `
      flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0
      hover:bg-gray-50 hover:shadow-sm transition-all duration-200 cursor-pointer
      group relative
    `,
    selectedItem: `
      bg-blue-50 border-blue-200 text-blue-900 shadow-sm
      hover:bg-blue-100 hover:shadow-md
    `,
    header:
      "bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-5 font-semibold text-gray-900 rounded-t-lg",
  },
};

export const transferListSizes: Record<
  Size,
  {
    container: string;
    item: string;
    text: string;
    icon: string;
    button: string;
    search: string;
    checkbox: string;
  }
> = {
  sm: {
    container: "text-sm",
    item: "min-h-[40px] px-2 py-2",
    text: "text-sm",
    icon: "w-4 h-4",
    button: "h-8 w-8 text-xs",
    search: "h-8 px-3 text-sm",
    checkbox: "w-4 h-4",
  },
  md: {
    container: "text-sm",
    item: "min-h-[48px] px-3 py-3",
    text: "text-sm",
    icon: "w-5 h-5",
    button: "h-10 w-10 text-sm",
    search: "h-10 px-3 text-sm",
    checkbox: "w-5 h-5",
  },
  lg: {
    container: "text-base",
    item: "min-h-[56px] px-4 py-4",
    text: "text-base",
    icon: "w-6 h-6",
    button: "h-12 w-12 text-base",
    search: "h-12 px-4 text-base",
    checkbox: "w-6 h-6",
  },
  xl: {
    container: "text-lg",
    item: "min-h-[64px] px-5 py-5",
    text: "text-lg",
    icon: "w-7 h-7",
    button: "h-14 w-14 text-lg",
    search: "h-14 px-5 text-lg",
    checkbox: "w-7 h-7",
  },
};

export const baseContainerStyles = `
  grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 w-full max-w-6xl mx-auto
`;

export const listContainerStyles = `
  flex flex-col h-full
`;

export const listHeaderStyles = `
  flex items-center justify-between p-4 border-b border-gray-200
`;

export const searchInputStyles = `
  w-full border border-gray-300 rounded-md px-3 py-2
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition-all duration-200
`;

export const transferButtonsStyles = `
  flex flex-col gap-2 items-center justify-center py-4
`;

export const transferButtonStyles = `
  inline-flex items-center justify-center
  bg-white border border-gray-300 rounded-lg
  hover:bg-gray-50 hover:border-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
  shadow-sm hover:shadow-md
`;

export const transferAllButtonStyles = `
  inline-flex items-center justify-center gap-2 px-3 py-2
  bg-blue-600 text-white border border-blue-600 rounded-md
  hover:bg-blue-700 hover:border-blue-700
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600
  text-sm font-medium
`;

export const itemContentStyles = `
  flex-1 min-w-0
`;

export const itemLabelStyles = `
  font-medium text-gray-900 truncate
`;

export const itemDescriptionStyles = `
  text-gray-500 text-sm truncate mt-1
`;

export const groupHeaderStyles = `
  px-3 py-2 bg-gray-100 border-b border-gray-200
  text-xs font-semibold text-gray-600 uppercase tracking-wide
  sticky top-0 z-10
`;

export const emptyStateStyles = `
  flex flex-col items-center justify-center py-12 text-gray-500
`;

export const dragHandleStyles = `
  opacity-0 group-hover:opacity-100 transition-opacity duration-200
  cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600
`;

export const sortableItemStyles = `
  transform transition-transform duration-200 ease-in-out
`;

export const draggingItemStyles = `
  opacity-50 transform rotate-2 scale-105 z-50
`;

export const dropZoneStyles = `
  border-2 border-dashed border-blue-300 bg-blue-50 rounded-md
  transition-all duration-200
`;

export const countBadgeStyles = `
  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
  bg-gray-100 text-gray-800
`;

export const selectedCountBadgeStyles = `
  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
  bg-blue-100 text-blue-800
`;

// Animation keyframes
export const transferListAnimations = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: scale(1);
    }
    40%, 43% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(1.02);
    }
    90% {
      transform: scale(1.01);
    }
  }
`;

export const slideInRightAnimation = `
  animation: slideInRight 0.3s ease-out;
`;

export const slideInLeftAnimation = `
  animation: slideInLeft 0.3s ease-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.2s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;

export const bounceAnimation = `
  animation: bounce 0.6s ease-in-out;
`;
