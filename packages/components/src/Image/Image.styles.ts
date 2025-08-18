import { Size, Variant, BaseComponentProps } from "../index";
import {
  ImageVariant,
  ImageFit,
  ImagePosition,
  ImageOverlayPosition,
} from "./Image.types";

export const imageVariants: Record<
  ImageVariant,
  {
    container: string;
    image: string;
  }
> = {
  default: {
    container: "relative overflow-hidden",
    image: "w-full h-full object-cover",
  },
  rounded: {
    container: "relative overflow-hidden rounded-lg",
    image: "w-full h-full object-cover",
  },
  circular: {
    container: "relative overflow-hidden rounded-full",
    image: "w-full h-full object-cover",
  },
  thumbnail: {
    container:
      "relative overflow-hidden rounded border-2 border-gray-200 shadow-sm",
    image: "w-full h-full object-cover",
  },
  polaroid: {
    container:
      "relative overflow-hidden rounded bg-white p-2 shadow-lg transform rotate-1",
    image: "w-full h-full object-cover rounded",
  },
};

export const imageSizes: Record<
  Size,
  {
    container: string;
    caption: string;
  }
> = {
  sm: {
    container: "w-16 h-16",
    caption: "text-xs mt-1",
  },
  md: {
    container: "w-24 h-24",
    caption: "text-sm mt-2",
  },
  lg: {
    container: "w-32 h-32",
    caption: "text-base mt-2",
  },
  xl: {
    container: "w-48 h-48",
    caption: "text-lg mt-3",
  },
};

export const imageFits: Record<ImageFit, string> = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

export const imagePositions: Record<ImagePosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  "top-left": "object-left-top",
  "top-right": "object-right-top",
  "bottom-left": "object-left-bottom",
  "bottom-right": "object-right-bottom",
};

export const overlayPositions: Record<ImageOverlayPosition, string> = {
  center: "absolute inset-0 flex items-center justify-center",
  top: "absolute top-0 left-0 right-0 flex items-start justify-center p-4",
  bottom: "absolute bottom-0 left-0 right-0 flex items-end justify-center p-4",
  left: "absolute top-0 bottom-0 left-0 flex items-center justify-start p-4",
  right: "absolute top-0 bottom-0 right-0 flex items-center justify-end p-4",
  "top-left": "absolute top-0 left-0 flex items-start justify-start p-4",
  "top-right": "absolute top-0 right-0 flex items-start justify-end p-4",
  "bottom-left": "absolute bottom-0 left-0 flex items-end justify-start p-4",
  "bottom-right": "absolute bottom-0 right-0 flex items-end justify-end p-4",
};

export const shadowStyles = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export const baseImageStyles = `
  transition-all duration-300 ease-in-out
  select-none
`;

export const baseContainerStyles = `
  relative inline-block
  transition-all duration-300 ease-in-out
`;

export const overlayStyles = `
  transition-all duration-300 ease-in-out
  pointer-events-none
`;

export const hoverOverlayStyles = `
  opacity-0 hover:opacity-100
`;

export const clickableStyles = `
  cursor-pointer hover:shadow-lg
  transform hover:scale-105 active:scale-95
`;

export const zoomStyles = `
  overflow-hidden
`;

export const zoomImageStyles = `
  transition-transform duration-500 ease-out
  hover:scale-110
`;

export const skeletonStyles = `
  animate-pulse bg-gray-200 rounded
  flex items-center justify-center
`;

export const captionStyles = `
  text-gray-600 text-center font-medium
`;

export const errorStateStyles = `
  bg-gray-100 border-2 border-dashed border-gray-300 rounded
  flex items-center justify-center text-gray-400
`;

export const loadingSpinnerStyles = `
  animate-spin text-gray-400
`;

export const progressiveImageStyles = `
  filter blur(5px) brightness(1.1)
  transition-filter duration-500 ease-out
`;

export const progressiveImageLoadedStyles = `
  filter blur(0) brightness(1)
`;

// Animation keyframes
export const imageAnimations = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const fadeInAnimation = `
  animation: fadeIn 0.5s ease-out;
`;

export const slideInAnimation = `
  animation: slideIn 0.6s ease-out;
`;

export const zoomInAnimation = `
  animation: zoomIn 0.4s ease-out;
`;

export const shimmerAnimation = `
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
`;

export const pulseAnimation = `
  animation: pulse 2s ease-in-out infinite;
`;
