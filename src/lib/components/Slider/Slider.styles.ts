import { Size } from "../../types/common";

export const sliderStyles = {
  wrapper: "relative",
  track: `
    w-full bg-gray-200 rounded-full cursor-pointer
    transition-all duration-200 ease-in-out
    relative overflow-visible
  `,
  filledTrack: `
    absolute top-0 left-0 h-full bg-blue-600 rounded-full
    transition-all duration-200 ease-in-out
  `,
  thumb: `
    absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2
    bg-white border-2 border-blue-600 rounded-full cursor-grab active:cursor-grabbing
    shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    z-10
  `,
};

export const sliderSizes: Record<
  Size,
  {
    track: string;
    thumb: string;
    label: string;
    mark: string;
    tooltip: string;
  }
> = {
  sm: {
    track: "h-2",
    thumb: "w-5 h-5",
    label: "text-xs",
    mark: "w-1 h-1",
    tooltip: "text-xs px-2 py-1",
  },
  md: {
    track: "h-3",
    thumb: "w-6 h-6",
    label: "text-sm",
    mark: "w-1.5 h-1.5",
    tooltip: "text-sm px-2 py-1",
  },
  lg: {
    track: "h-4",
    thumb: "w-7 h-7",
    label: "text-base",
    mark: "w-2 h-2",
    tooltip: "text-base px-3 py-2",
  },
  xl: {
    track: "h-5",
    thumb: "w-8 h-8",
    label: "text-lg",
    mark: "w-3 h-3",
    tooltip: "text-lg px-4 py-2",
  },
};

export const labelStyles = `
  block font-medium text-gray-700 mb-2
`;

export const descriptionStyles = `
  text-gray-600 text-sm mb-3
`;

export const errorStyles = `
  text-red-600 text-sm mt-2
`;

export const requiredIndicatorStyles = `
  text-red-500 ml-1
`;

export const minMaxLabelStyles = `
  flex justify-between text-sm text-gray-500 mt-2
`;

export const markStyles = `
  absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2
  bg-white rounded-full border border-gray-300
`;

export const markLabelStyles = `
  absolute top-full mt-2 transform -translate-x-1/2
  text-xs text-gray-600 whitespace-nowrap
`;

export const tooltipStyles = `
  absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
  bg-gray-900 text-white rounded px-2 py-1 text-xs
  opacity-0 pointer-events-none transition-opacity duration-200
  before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2
  before:border-4 before:border-transparent before:border-t-gray-900
  z-20
`;

export const tooltipVisibleStyles = `
  opacity-100
`;

export const thumbIconStyles = `
  absolute inset-0 flex items-center justify-center
  text-blue-600
`;

// Animation keyframes
export const sliderAnimations = `
  @keyframes thumbBounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    40%, 43% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    70% {
      transform: translate(-50%, -50%) scale(1.05);
    }
    90% {
      transform: translate(-50%, -50%) scale(1.02);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const thumbBounceAnimation = `
  animation: thumbBounce 0.6s ease-in-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const slideInAnimation = `
  animation: slideIn 0.2s ease-out;
`;
