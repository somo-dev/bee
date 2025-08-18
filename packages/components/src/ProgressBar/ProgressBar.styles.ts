import { Size, Variant, BaseComponentProps } from "../index";
import { ProgressBarVariant } from "./ProgressBar.types";

export const progressBarVariants: Record<
  ProgressBarVariant,
  {
    container: string;
    track: string;
    fill: string;
  }
> = {
  default: {
    container: "relative overflow-hidden",
    track: "w-full bg-gray-200",
    fill: "h-full bg-blue-600 transition-all duration-300 ease-out",
  },
  striped: {
    container: "relative overflow-hidden",
    track: "w-full bg-gray-200",
    fill: "h-full bg-blue-500 transition-all duration-300 ease-out",
  },
  gradient: {
    container: "relative overflow-hidden",
    track: "w-full bg-gray-200",
    fill: "h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out",
  },
  rounded: {
    container: "relative overflow-hidden rounded-full",
    track: "w-full bg-gray-200 rounded-full",
    fill: "h-full bg-blue-600 transition-all duration-300 ease-out rounded-full",
  },
};

export const progressBarSizes: Record<
  Size,
  {
    container: string;
    track: string;
    height: string;
    text: string;
  }
> = {
  sm: {
    container: "h-2",
    track: "h-2",
    height: "8px",
    text: "text-xs",
  },
  md: {
    container: "h-3",
    track: "h-3",
    height: "12px",
    text: "text-sm",
  },
  lg: {
    container: "h-4",
    track: "h-4",
    height: "16px",
    text: "text-base",
  },
  xl: {
    container: "h-6",
    track: "h-6",
    height: "24px",
    text: "text-lg",
  },
};

export const baseProgressBarStyles = `
  relative w-full overflow-hidden
  transition-all duration-300 ease-out
`;

export const trackStyles = `
  relative w-full
  transition-all duration-300 ease-out
`;

export const fillStyles = `
  h-full transition-all duration-300 ease-out
  transform-gpu
`;

export const stripedStyles = `
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.4) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.4) 75%,
    transparent 75%,
    transparent
  );
  background-size: 16px 16px;
`;

export const animatedStripesStyles = `
  animation: progress-stripes 2s linear infinite;
`;

export const labelStyles = `
  font-medium text-center
  transition-all duration-300 ease-out
`;

export const insideLabelStyles = `
  absolute inset-0 flex items-center justify-center
  text-white text-shadow-sm z-10
`;

export const outsideLabelStyles = `
  mt-2 text-gray-700
`;

export const glowStyles = `
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.4));
`;

export const pulseStyles = `
  animation: progress-pulse 0.8s ease-in-out 3;
`;

export const indeterminateStyles = `
  animation: progress-indeterminate 2s ease-in-out infinite;
`;

export const loadingStyles = `
  animation: progress-loading 1.5s ease-in-out infinite;
`;

export const disabledStyles = `
  opacity-50 cursor-not-allowed
`;

// Animation keyframes
export const progressBarAnimations = `
  @keyframes progress-stripes {
    0% {
      background-position: 16px 0;
    }
    100% {
      background-position: 0 0;
    }
  }
  
  @keyframes progress-pulse {
    0%, 100% {
      transform: scale(1);
      filter: brightness(1);
    }
    50% {
      transform: scale(1.05);
      filter: brightness(1.2);
    }
  }
  
  @keyframes progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes progress-loading {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
  
  @keyframes progress-glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
    }
  }
  
  @keyframes progress-shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

export const stripedAnimation = `
  animation: progress-stripes 1s linear infinite;
`;

export const pulseAnimation = `
  animation: progress-pulse 1s ease-in-out;
`;

export const indeterminateAnimation = `
  animation: progress-indeterminate 2s ease-in-out infinite;
`;

export const loadingAnimation = `
  animation: progress-loading 1.5s ease-in-out infinite;
`;

export const glowAnimation = `
  animation: progress-glow 2s ease-in-out infinite;
`;

export const shimmerAnimation = `
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200px 100%;
  animation: progress-shimmer 1.5s infinite;
`;
