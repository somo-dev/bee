import { Size } from "../../types/common";
import {
  TableOfContentsVariant,
  TableOfContentsPosition,
} from "./TableOfContents.types";

export const tableOfContentsVariants: Record<
  TableOfContentsVariant,
  {
    container: string;
    item: string;
    activeItem: string;
    nestedItem: string;
  }
> = {
  minimal: {
    container: `
      bg-white border border-gray-200 rounded-lg
      shadow-sm overflow-hidden
    `,
    item: `
      flex items-center gap-3 px-3 py-2 text-gray-600
      hover:bg-gray-50 hover:text-gray-900
      transition-all duration-200 ease-out
      cursor-pointer
      group relative
    `,
    activeItem: `
      bg-blue-50 text-blue-700 font-medium
      hover:bg-blue-100
    `,
    nestedItem: `
      pl-6 text-gray-500 text-sm
      hover:text-gray-700
    `,
  },
  sidebar: {
    container: `
      bg-white border-r border-gray-200
      h-full overflow-hidden
    `,
    item: `
      flex items-center gap-3 px-4 py-3 text-gray-700
      hover:bg-gray-100 hover:text-gray-900
      transition-all duration-200 ease-out
      cursor-pointer border-r-2 border-transparent
      group relative
    `,
    activeItem: `
      bg-blue-50 text-blue-700 border-r-blue-500 font-medium
      hover:bg-blue-100
    `,
    nestedItem: `
      pl-8 text-gray-600 text-sm
      hover:text-gray-800
    `,
  },
  floating: {
    container: `
      bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl
      shadow-xl overflow-hidden
    `,
    item: `
      flex items-center gap-3 px-4 py-2.5 text-gray-600
      hover:bg-gray-100/50 hover:text-gray-900
      transition-all duration-200 ease-out
      cursor-pointer
      group relative
    `,
    activeItem: `
      bg-blue-100/50 text-blue-700 font-medium
      hover:bg-blue-200/50
    `,
    nestedItem: `
      pl-8 text-gray-500 text-sm
      hover:text-gray-700
    `,
  },
};

export const tableOfContentsSizes: Record<
  Size,
  {
    container: string;
    item: string;
    text: string;
    icon: string;
    title: string;
    number: string;
  }
> = {
  sm: {
    container: "text-xs",
    item: "px-3 py-1.5 min-h-[32px]",
    text: "text-xs",
    icon: "w-3 h-3",
    title: "text-sm font-semibold px-3 py-2",
    number: "text-xs w-4 h-4",
  },
  md: {
    container: "text-sm",
    item: "px-4 py-2.5 min-h-[40px]",
    text: "text-sm",
    icon: "w-4 h-4",
    title: "text-base font-semibold px-4 py-3",
    number: "text-xs w-5 h-5",
  },
  lg: {
    container: "text-base",
    item: "px-5 py-3 min-h-[48px]",
    text: "text-base",
    icon: "w-5 h-5",
    title: "text-lg font-semibold px-5 py-4",
    number: "text-sm w-6 h-6",
  },
  xl: {
    container: "text-lg",
    item: "px-6 py-4 min-h-[56px]",
    text: "text-lg",
    icon: "w-6 h-6",
    title: "text-xl font-semibold px-6 py-5",
    number: "text-base w-7 h-7",
  },
};

export const tableOfContentsPositions: Record<TableOfContentsPosition, string> =
  {
    left: "left-0",
    right: "right-0",
  };

export const baseTocStyles = `
  relative overflow-hidden
  transition-all duration-300 ease-out
`;

export const tocItemStyles = `
  relative flex items-center
  transition-all duration-200 ease-out
  select-none
`;

export const tocScrollAreaStyles = `
  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
  hover:scrollbar-thumb-gray-400
`;

export const tocTitleStyles = `
  font-semibold text-gray-900 border-b border-gray-200
  flex items-center gap-2
`;

export const tocNumberStyles = `
  inline-flex items-center justify-center
  bg-gray-100 text-gray-600 rounded-full
  font-medium flex-shrink-0
`;

export const tocActiveNumberStyles = `
  bg-blue-100 text-blue-700
`;

export const tocNestedIndicatorStyles = `
  absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300
`;

export const tocActiveIndicatorStyles = `
  bg-blue-500
`;

export const tocCollapseButtonStyles = `
  p-1 hover:bg-gray-100 rounded transition-colors
  text-gray-400 hover:text-gray-600
`;

export const tocStickyStyles = `
  sticky z-40
`;

export const tocFloatingStyles = `
  fixed z-50
`;

// Animation keyframes
export const tocAnimations = `
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
  
  @keyframes highlight {
    0% {
      background-color: transparent;
    }
    50% {
      background-color: rgba(59, 130, 246, 0.1);
    }
    100% {
      background-color: transparent;
    }
  }
`;

export const slideInLeftAnimation = `
  animation: slideInLeft 0.3s ease-out;
`;

export const slideInRightAnimation = `
  animation: slideInRight 0.3s ease-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.2s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 2s ease-in-out infinite;
`;

export const highlightAnimation = `
  animation: highlight 1s ease-out;
`;
