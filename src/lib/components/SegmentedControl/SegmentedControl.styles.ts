import { Size } from "../../types/common";
import {
  SegmentedControlVariant,
  SegmentedControlRadius,
  SegmentedControlOrientation,
} from "./SegmentedControl.types";

export const segmentedControlVariants: Record<
  SegmentedControlVariant,
  {
    root: string;
    segment: string;
    activeSegment: string;
    indicator: string;
  }
> = {
  default: {
    root: `
      inline-flex bg-gray-100 rounded-lg px-2 py-1
      border border-gray-200
    `,
    segment: `
      relative flex items-center justify-center
      px-6 py-2 text-sm font-medium
      text-gray-600 hover:text-gray-900
      transition-all duration-200 ease-in-out
      cursor-pointer select-none
      rounded-md
      hover:bg-gray-50
    `,
    activeSegment: `
      text-white bg-blue-600 shadow-sm
      hover:bg-blue-700 hover:text-white
    `,
    indicator: `
      absolute inset-0 bg-blue-600 rounded-md shadow-sm
      transition-all duration-200 ease-in-out
    `,
  },
  pills: {
    root: `
      inline-flex bg-gray-50 rounded-full px-2 py-1
      border border-gray-200
    `,
    segment: `
      relative flex items-center justify-center
      px-6 py-2 text-sm font-medium
      text-gray-600 hover:text-gray-900
      transition-all duration-200 ease-in-out
      cursor-pointer select-none
      rounded-full
      hover:bg-gray-100
    `,
    activeSegment: `
      text-white bg-blue-600 shadow-md
      hover:bg-blue-700 hover:text-white
    `,
    indicator: `
      absolute inset-0 bg-blue-600 rounded-full shadow-md
      transition-all duration-300 ease-out
    `,
  },
  outline: {
    root: `
      inline-flex border border-gray-300 rounded-lg px-2 py-1
      divide-x divide-gray-300
    `,
    segment: `
      relative flex items-center justify-center
      px-4 py-2 text-sm font-medium
      text-gray-700 hover:text-gray-900
      transition-all duration-200 ease-in-out
      cursor-pointer select-none
      hover:bg-gray-50
      first:rounded-l-lg last:rounded-r-lg
    `,
    activeSegment: `
      text-blue-700 bg-blue-50 border-blue-300
      hover:bg-blue-100 hover:text-blue-800
    `,
    indicator: `
      absolute inset-0 bg-blue-50 border-2 border-blue-300
      transition-all duration-200 ease-in-out
      first:rounded-l-lg last:rounded-r-lg
    `,
  },
  minimal: {
    root: `
      inline-flex gap-1
    `,
    segment: `
      relative flex items-center justify-center
      px-3 py-2 text-sm font-medium
      text-gray-600 hover:text-gray-900
      transition-all duration-200 ease-in-out
      cursor-pointer select-none
      rounded-md
      hover:bg-gray-100
    `,
    activeSegment: `
      text-blue-700 bg-blue-100
      hover:bg-blue-200 hover:text-blue-800
    `,
    indicator: `
      absolute inset-0 bg-blue-100 rounded-md
      transition-all duration-200 ease-in-out
    `,
  },
};

export const segmentedControlSizes: Record<
  Size,
  {
    root: string;
    segment: string;
    text: string;
    icon: string;
    padding: string;
    gap: string;
  }
> = {
  sm: {
    root: "text-xs",
    segment: "min-h-[28px]",
    text: "text-xs",
    icon: "w-3 h-3",
    padding: "px-3 py-1",
    gap: "gap-1",
  },
  md: {
    root: "text-sm",
    segment: "min-h-[36px]",
    text: "text-sm",
    icon: "w-4 h-4",
    padding: "px-4 py-2",
    gap: "gap-2",
  },
  lg: {
    root: "text-base",
    segment: "min-h-[44px]",
    text: "text-base",
    icon: "w-5 h-5",
    padding: "px-5 py-3",
    gap: "gap-2",
  },
  xl: {
    root: "text-lg",
    segment: "min-h-[52px]",
    text: "text-lg",
    icon: "w-6 h-6",
    padding: "px-7 py-4",
    gap: "gap-3",
  },
};

export const segmentedControlRadius: Record<SegmentedControlRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const segmentedControlOrientations: Record<
  SegmentedControlOrientation,
  {
    root: string;
    segment: string;
  }
> = {
  horizontal: {
    root: "flex-row",
    segment: "flex-row",
  },
  vertical: {
    root: "flex-col",
    segment: "flex-col",
  },
};

export const baseSegmentedControlStyles = `
  relative inline-flex
  transition-all duration-200 ease-in-out
`;

export const segmentStyles = `
  relative z-10 flex items-center justify-center
  font-medium transition-all duration-200 ease-in-out
  cursor-pointer select-none
`;

// Utility to remove right padding for the last segment
export const lastSegmentNoPadding = `last:pr-0`;

export const indicatorStyles = `
  absolute z-0 transition-all duration-300 ease-out
  pointer-events-none
`;

export const disabledSegmentStyles = `
  opacity-50 cursor-not-allowed pointer-events-none
`;

export const badgeStyles = `
  inline-flex items-center justify-center
  ml-2 px-1.5 py-0.5 text-xs font-medium
  bg-gray-200 text-gray-700 rounded-full
`;

export const activeBadgeStyles = `
  bg-blue-200 text-blue-800
`;

// Animation keyframes
export const segmentedControlAnimations = `
  @keyframes slideIndicator {
    from {
      transform: translateX(var(--from-x, 0)) translateY(var(--from-y, 0));
      width: var(--from-width, auto);
      height: var(--from-height, auto);
    }
    to {
      transform: translateX(var(--to-x, 0)) translateY(var(--to-y, 0));
      width: var(--to-width, auto);
      height: var(--to-height, auto);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

export const slideIndicatorAnimation = `
  animation: slideIndicator 0.3s ease-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.2s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;
