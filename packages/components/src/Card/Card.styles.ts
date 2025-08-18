import { Size } from "../index";
import { CardVariant, CardShadow } from "./Card.types";

export const cardVariants: Record<
  CardVariant,
  {
    root: string;
    content: string;
  }
> = {
  default: {
    root: `
      bg-white border border-gray-200 rounded-lg
      transition-all duration-200 ease-in-out
    `,
    content: "bg-white",
  },
  elevated: {
    root: `
      bg-white border border-gray-100 rounded-xl shadow-lg
      hover:shadow-xl transition-all duration-300 ease-out
      transform hover:-translate-y-1
    `,
    content: "bg-white",
  },
  outlined: {
    root: `
      bg-white border-2 border-gray-300 rounded-lg
      hover:border-gray-400 transition-all duration-200 ease-in-out
    `,
    content: "bg-white",
  },
  filled: {
    root: `
      bg-gray-50 border border-gray-200 rounded-lg
      hover:bg-gray-100 transition-all duration-200 ease-in-out
    `,
    content: "bg-gray-50",
  },
  glass: {
    root: `
      bg-white/80 backdrop-blur-md border border-white/20 rounded-xl
      shadow-lg hover:shadow-xl transition-all duration-300 ease-out
      hover:bg-white/90
    `,
    content: "bg-transparent",
  },
  gradient: {
    root: `
      bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl
      shadow-lg hover:shadow-xl transition-all duration-300 ease-out
      transform hover:scale-105
    `,
    content: "bg-transparent text-white",
  },
};

export const cardShadows: Record<CardShadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  inner: "shadow-inner",
};

export const cardSizes: Record<
  Size,
  {
    root: string;
    padding: string;
    title: string;
    subtitle: string;
    description: string;
    action: string;
    icon: string;
    badge: string;
  }
> = {
  sm: {
    root: "max-w-sm",
    padding: "p-4",
    title: "text-lg font-semibold",
    subtitle: "text-sm text-gray-600",
    description: "text-sm text-gray-700",
    action: "text-sm px-3 py-1.5",
    icon: "w-5 h-5",
    badge: "text-xs px-2 py-1",
  },
  md: {
    root: "max-w-md",
    padding: "p-6",
    title: "text-xl font-semibold",
    subtitle: "text-base text-gray-600",
    description: "text-base text-gray-700",
    action: "text-sm px-4 py-2",
    icon: "w-6 h-6",
    badge: "text-sm px-2.5 py-1",
  },
  lg: {
    root: "max-w-lg",
    padding: "p-8",
    title: "text-2xl font-semibold",
    subtitle: "text-lg text-gray-600",
    description: "text-lg text-gray-700",
    action: "text-base px-5 py-2.5",
    icon: "w-7 h-7",
    badge: "text-base px-3 py-1.5",
  },
  xl: {
    root: "max-w-xl",
    padding: "p-10",
    title: "text-3xl font-semibold",
    subtitle: "text-xl text-gray-600",
    description: "text-xl text-gray-700",
    action: "text-lg px-6 py-3",
    icon: "w-8 h-8",
    badge: "text-lg px-4 py-2",
  },
};

export const baseCardStyles = `
  relative overflow-hidden
  transition-all duration-200 ease-in-out
`;

export const interactiveCardStyles = `
  cursor-pointer hover:shadow-lg
  transform hover:-translate-y-0.5 active:translate-y-0
`;

export const disabledCardStyles = `
  opacity-50 cursor-not-allowed pointer-events-none
`;

export const headerStyles = `
  flex items-center justify-between
  border-b border-gray-100 pb-4 mb-4
`;

export const titleSectionStyles = `
  flex items-start gap-3
`;

export const titleStyles = `
  text-gray-900 leading-tight
`;

export const subtitleStyles = `
  text-gray-600 mt-1
`;

export const descriptionStyles = `
  text-gray-700 leading-relaxed
`;

export const imageContainerStyles = `
  relative overflow-hidden
`;

export const imageStyles = `
  w-full h-full object-cover transition-transform duration-300 ease-out
  hover:scale-105
`;

export const imageOverlayStyles = `
  absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30
  transition-all duration-300 ease-out
  flex items-center justify-center
`;

export const imageOverlayContentStyles = `
  text-white opacity-0 hover:opacity-100
  transition-opacity duration-300 ease-out
  transform translate-y-2 hover:translate-y-0
`;

export const contentSectionStyles = `
  space-y-4
`;

export const footerStyles = `
  border-t border-gray-100 pt-4 mt-4
`;

export const actionsContainerStyles = `
  flex items-center gap-3 flex-wrap
`;

export const actionButtonStyles = `
  inline-flex items-center justify-center gap-2
  font-medium rounded-lg transition-all duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export const actionVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

export const badgeContainerStyles = `
  absolute z-10
`;

export const badgePositions = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

export const badgeStyles = `
  inline-flex items-center font-medium rounded-full
  shadow-sm backdrop-blur-sm
`;

export const badgeVariants = {
  filled: "text-white",
  outline: "bg-white border-2",
  subtle: "bg-white/90 text-gray-900",
};

export const loadingOverlayStyles = `
  absolute inset-0 bg-white/80 backdrop-blur-sm
  flex items-center justify-center z-20
`;

export const loadingSpinnerStyles = `
  animate-spin text-blue-600
`;

export const skeletonStyles = `
  animate-pulse bg-gray-200 rounded
`;

export const dividerStyles = `
  border-t border-gray-100 my-4
`;

// Animation keyframes
export const cardAnimations = `
  @keyframes cardHover {
    0% {
      transform: translateY(0) scale(1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    100% {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
  }
  
  @keyframes cardPress {
    0% {
      transform: translateY(-4px) scale(1.02);
    }
    100% {
      transform: translateY(-2px) scale(1.01);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
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
`;

export const cardHoverAnimation = `
  animation: cardHover 0.3s ease-out forwards;
`;

export const cardPressAnimation = `
  animation: cardPress 0.1s ease-out forwards;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.5s ease-out;
`;

export const slideInAnimation = `
  animation: slideIn 0.4s ease-out;
`;

export const scaleInAnimation = `
  animation: scaleIn 0.3s ease-out;
`;

export const shimmerAnimation = `
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
`;
