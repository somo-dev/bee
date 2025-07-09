import { Size } from "../../types/common";
import { TimelineVariant, TimelineAlign } from "./Timeline.types";

export const timelineVariants: Record<
  TimelineVariant,
  {
    root: string;
    item: string;
    bullet: string;
    content: string;
    line: string;
  }
> = {
  default: {
    root: "relative",
    item: `
      relative flex items-start gap-4 pb-6 last:pb-0
      transition-all duration-300 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      rounded-full border-2 border-white shadow-sm
      transition-all duration-300 ease-out
      flex-shrink-0
    `,
    content: `
      flex-1 min-w-0 pt-0.5
    `,
    line: `
      absolute left-0 top-0 bottom-0 w-0.5
      transition-all duration-300 ease-out
    `,
  },
  filled: {
    root: "relative",
    item: `
      relative flex items-start gap-4 pb-6 last:pb-0
      transition-all duration-300 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      rounded-full border-0 shadow-md
      transition-all duration-300 ease-out
      flex-shrink-0
    `,
    content: `
      flex-1 min-w-0 pt-0.5
    `,
    line: `
      absolute left-0 top-0 bottom-0 w-0.5
      transition-all duration-300 ease-out
    `,
  },
  outline: {
    root: "relative",
    item: `
      relative flex items-start gap-4 pb-6 last:pb-0
      transition-all duration-300 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      rounded-full border-2 bg-white shadow-sm
      transition-all duration-300 ease-out
      flex-shrink-0
    `,
    content: `
      flex-1 min-w-0 pt-0.5
    `,
    line: `
      absolute left-0 top-0 bottom-0 w-0.5
      transition-all duration-300 ease-out
    `,
  },
  minimal: {
    root: "relative",
    item: `
      relative flex items-start gap-3 pb-4 last:pb-0
      transition-all duration-300 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      rounded-full border border-gray-300 bg-white
      transition-all duration-300 ease-out
      flex-shrink-0
    `,
    content: `
      flex-1 min-w-0 pt-0
    `,
    line: `
      absolute left-0 top-0 bottom-0 w-px
      transition-all duration-300 ease-out
    `,
  },
};

export const timelineSizes: Record<
  Size,
  {
    bullet: string;
    bulletSize: number;
    icon: string;
    title: string;
    description: string;
    timestamp: string;
    spacing: string;
    lineOffset: string;
  }
> = {
  sm: {
    bullet: "w-6 h-6",
    bulletSize: 24,
    icon: "w-3 h-3",
    title: "text-sm font-medium",
    description: "text-xs",
    timestamp: "text-xs",
    spacing: "gap-3 pb-4",
    lineOffset: "left-3",
  },
  md: {
    bullet: "w-8 h-8",
    bulletSize: 32,
    icon: "w-4 h-4",
    title: "text-base font-medium",
    description: "text-sm",
    timestamp: "text-sm",
    spacing: "gap-4 pb-6",
    lineOffset: "left-4",
  },
  lg: {
    bullet: "w-10 h-10",
    bulletSize: 40,
    icon: "w-5 h-5",
    title: "text-lg font-medium",
    description: "text-base",
    timestamp: "text-base",
    spacing: "gap-5 pb-8",
    lineOffset: "left-5",
  },
  xl: {
    bullet: "w-12 h-12",
    bulletSize: 48,
    icon: "w-6 h-6",
    title: "text-xl font-medium",
    description: "text-lg",
    timestamp: "text-lg",
    spacing: "gap-6 pb-10",
    lineOffset: "left-6",
  },
};

export const timelineAlignments: Record<
  TimelineAlign,
  {
    root: string;
    item: string;
    content: string;
  }
> = {
  left: {
    root: "text-left",
    item: "flex-row",
    content: "text-left",
  },
  right: {
    root: "text-right",
    item: "flex-row-reverse",
    content: "text-right",
  },
  center: {
    root: "text-center",
    item: "flex-col items-center",
    content: "text-center",
  },
};

export const titleStyles = `
  text-gray-900 leading-tight mb-1
`;

export const descriptionStyles = `
  text-gray-600 leading-relaxed
`;

export const timestampStyles = `
  text-gray-500 font-medium
`;

export const activeItemStyles = `
  transform scale-105
`;

export const completedItemStyles = `
  opacity-75
`;

export const disabledItemStyles = `
  opacity-50 cursor-not-allowed
`;

export const interactiveItemStyles = `
  cursor-pointer hover:bg-gray-50 hover:shadow-sm
  rounded-lg p-2 -m-2 transition-all duration-200
`;

export const numberBadgeStyles = `
  absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white
  rounded-full flex items-center justify-center text-xs font-bold
`;

export const skeletonStyles = `
  animate-pulse bg-gray-200 rounded
`;

export const emptyStateStyles = `
  flex flex-col items-center justify-center py-12 text-gray-500
`;

// Animation keyframes
export const timelineAnimations = `
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
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes drawLine {
    from {
      height: 0;
    }
    to {
      height: 100%;
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
`;

export const slideInLeftAnimation = `
  animation: slideInLeft 0.6s ease-out;
`;

export const slideInRightAnimation = `
  animation: slideInRight 0.6s ease-out;
`;

export const fadeInUpAnimation = `
  animation: fadeInUp 0.6s ease-out;
`;

export const scaleInAnimation = `
  animation: scaleIn 0.4s ease-out;
`;

export const drawLineAnimation = `
  animation: drawLine 1s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 2s ease-in-out infinite;
`;
