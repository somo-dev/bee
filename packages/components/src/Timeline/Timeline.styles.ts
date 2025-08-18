import { Size, Variant, BaseComponentProps } from "../index";
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
    root: "relative border-l-2 border-gray-200 pl-8",
    item: `relative mb-10 flex items-start`,
    bullet: `absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow z-10`,
    content: `ml-8`,
    line: `hidden`, // line handled by border-l-2 on root
  },
  filled: {
    root: "relative",
    item: `
      relative flex items-start gap-4 pb-8 last:pb-0
      transition-all duration-200 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      w-8 h-8 rounded-full border-0 shadow-md
      transition-all duration-200 ease-out
      flex-shrink-0 mt-0.5
    `,
    content: `
      flex-1 min-w-0 pt-0
    `,
    line: `
      absolute left-4 top-8 bottom-0 w-0.5 bg-blue-500
      transition-all duration-200 ease-out
      transform -translate-x-0.5
    `,
  },
  outline: {
    root: "relative",
    item: `
      relative flex items-start gap-4 pb-8 last:pb-0
      transition-all duration-200 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      w-8 h-8 rounded-full border-2 bg-white shadow-sm
      transition-all duration-200 ease-out
      flex-shrink-0 mt-0.5
    `,
    content: `
      flex-1 min-w-0 pt-0
    `,
    line: `
      absolute left-4 top-8 bottom-0 w-0.5 bg-blue-500
      transition-all duration-200 ease-out
      transform -translate-x-0.5
    `,
  },
  minimal: {
    root: "relative",
    item: `
      relative flex items-start gap-3 pb-6 last:pb-0
      transition-all duration-200 ease-out
    `,
    bullet: `
      relative z-10 flex items-center justify-center
      w-6 h-6 rounded-full border border-gray-300 bg-white
      transition-all duration-200 ease-out
      flex-shrink-0 mt-1
    `,
    content: `
      flex-1 min-w-0 pt-0
    `,
    line: `
      absolute left-3 top-6 bottom-0 w-px bg-gray-300
      transition-all duration-200 ease-out
      transform -translate-x-0.5
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
    title: "text-sm font-semibold",
    description: "text-xs",
    timestamp: "text-xs",
    spacing: "gap-3 pb-6",
    lineOffset: "left-3",
  },
  md: {
    bullet: "w-8 h-8",
    bulletSize: 32,
    icon: "w-4 h-4",
    title: "text-base font-semibold",
    description: "text-sm",
    timestamp: "text-sm",
    spacing: "gap-4 pb-8",
    lineOffset: "left-4",
  },
  lg: {
    bullet: "w-10 h-10",
    bulletSize: 40,
    icon: "w-5 h-5",
    title: "text-lg font-semibold",
    description: "text-base",
    timestamp: "text-base",
    spacing: "gap-5 pb-10",
    lineOffset: "left-5",
  },
  xl: {
    bullet: "w-12 h-12",
    bulletSize: 48,
    icon: "w-6 h-6",
    title: "text-xl font-semibold",
    description: "text-lg",
    timestamp: "text-lg",
    spacing: "gap-6 pb-12",
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

export const titleStyles = `text-lg font-black text-gray-900 mb-1`;

export const descriptionStyles = `text-gray-700 text-base`;

export const timestampStyles = `font-mono italic text-gray-500 text-sm mb-1`;

export const activeItemStyles = `
  border-2 border-[#3b82f6] bg-white
`;

export const completedItemStyles = `
  bg-[#3b82f6] border-2 border-[#3b82f6] text-white
`;

export const disabledItemStyles = `
  border-2 border-gray-300 bg-white text-gray-300
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
