import { Size } from "../../types/common";
import { ToastType, ToastPosition } from "./Toaster.types";

export const toastTypes: Record<
  ToastType,
  {
    background: string;
    border: string;
    text: string;
    icon: string;
    progress: string;
  }
> = {
  info: {
    background: "bg-blue-50 border-blue-200",
    border: "border-blue-200",
    text: "text-blue-900",
    icon: "text-blue-600",
    progress: "bg-blue-500",
  },
  success: {
    background: "bg-green-50 border-green-200",
    border: "border-green-200",
    text: "text-green-900",
    icon: "text-green-600",
    progress: "bg-green-500",
  },
  warning: {
    background: "bg-yellow-50 border-yellow-200",
    border: "border-yellow-200",
    text: "text-yellow-900",
    icon: "text-yellow-600",
    progress: "bg-yellow-500",
  },
  error: {
    background: "bg-red-50 border-red-200",
    border: "border-red-200",
    text: "text-red-900",
    icon: "text-red-600",
    progress: "bg-red-500",
  },
  loading: {
    background: "bg-gray-50 border-gray-200",
    border: "border-gray-200",
    text: "text-gray-900",
    icon: "text-gray-600",
    progress: "bg-gray-500",
  },
};

export const toastSizes: Record<
  Size,
  {
    container: string;
    toast: string;
    icon: string;
    title: string;
    message: string;
    action: string;
    close: string;
    progress: string;
  }
> = {
  sm: {
    container: "w-80",
    toast: "p-3",
    icon: "w-4 h-4",
    title: "text-sm font-semibold",
    message: "text-xs",
    action: "px-2 py-1 text-xs",
    close: "w-4 h-4",
    progress: "h-1",
  },
  md: {
    container: "w-96",
    toast: "p-4",
    icon: "w-5 h-5",
    title: "text-base font-semibold",
    message: "text-sm",
    action: "px-3 py-1.5 text-sm",
    close: "w-5 h-5",
    progress: "h-1",
  },
  lg: {
    container: "w-[28rem]",
    toast: "p-5",
    icon: "w-6 h-6",
    title: "text-lg font-semibold",
    message: "text-base",
    action: "px-4 py-2 text-base",
    close: "w-6 h-6",
    progress: "h-1.5",
  },
  xl: {
    container: "w-[32rem]",
    toast: "p-6",
    icon: "w-7 h-7",
    title: "text-xl font-semibold",
    message: "text-lg",
    action: "px-5 py-2.5 text-lg",
    close: "w-7 h-7",
    progress: "h-2",
  },
};

export const toastPositions: Record<
  ToastPosition,
  {
    container: string;
    toast: string;
  }
> = {
  "top-left": {
    container: "top-0 left-0 items-start",
    toast: "slide-in-left",
  },
  "top-center": {
    container: "top-0 left-1/2 transform -translate-x-1/2 items-center",
    toast: "slide-in-down",
  },
  "top-right": {
    container: "top-0 right-0 items-end",
    toast: "slide-in-right",
  },
  "bottom-left": {
    container: "bottom-0 left-0 items-start",
    toast: "slide-in-left",
  },
  "bottom-center": {
    container: "bottom-0 left-1/2 transform -translate-x-1/2 items-center",
    toast: "slide-in-up",
  },
  "bottom-right": {
    container: "bottom-0 right-0 items-end",
    toast: "slide-in-right",
  },
};

export const baseToasterStyles = `
  fixed z-50 flex flex-col pointer-events-none
  transition-all duration-300 ease-out
`;

export const baseToastStyles = `
  relative flex items-start gap-3 
  border rounded-lg shadow-lg backdrop-blur-sm
  pointer-events-auto
  transition-all duration-300 ease-out
  transform-gpu
  hover:shadow-lg hover:scale-[1.02]
  group
`;

export const toastContentStyles = `
  flex-1 min-w-0
`;

export const toastHeaderStyles = `
  flex items-center justify-between gap-2 mb-1
`;

export const toastActionsStyles = `
  flex items-center gap-2 mt-3
`;

export const closeButtonStyles = `
  flex-shrink-0 p-1 rounded-md
  text-gray-400 hover:text-gray-600 hover:bg-gray-100
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
`;

export const actionButtonStyles = `
  px-3 py-1.5 text-sm font-medium rounded-md
  bg-white border border-gray-300
  hover:bg-gray-50 hover:border-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
  transition-all duration-200 ease-out
`;

export const progressBarStyles = `
  absolute bottom-0 left-0 right-0
  bg-black bg-opacity-10 overflow-hidden rounded-b-lg
`;

export const progressFillStyles = `
  h-full transition-all duration-100 ease-linear
`;

export const loadingSpinnerStyles = `
  animate-spin
`;

export const stackedToastStyles = `
  transform-gpu transition-all duration-300 ease-out
`;

export const expandedToastStyles = `
  transform scale-[1.02] shadow-lg z-10
`;

// Animation keyframes
export const toasterAnimations = `
  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slide-in-down {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slide-in-up {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slide-out-right {
    from {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(100%) scale(0.95);
    }
  }
  
  @keyframes slide-out-left {
    from {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(-100%) scale(0.95);
    }
  }
  
  @keyframes slide-out-up {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-100%) scale(0.95);
    }
  }
  
  @keyframes slide-out-down {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(100%) scale(0.95);
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

export const slideInRightAnimation = `
  animation: slide-in-right 0.3s ease-out;
`;

export const slideInLeftAnimation = `
  animation: slide-in-left 0.3s ease-out;
`;

export const slideInDownAnimation = `
  animation: slide-in-down 0.3s ease-out;
`;

export const slideInUpAnimation = `
  animation: slide-in-up 0.3s ease-out;
`;

export const slideOutRightAnimation = `
  animation: slide-out-right 0.3s ease-in;
`;

export const slideOutLeftAnimation = `
  animation: slide-out-left 0.3s ease-in;
`;

export const slideOutUpAnimation = `
  animation: slide-out-up 0.3s ease-in;
`;

export const slideOutDownAnimation = `
  animation: slide-out-down 0.3s ease-in;
`;

export const fadeInAnimation = `
  animation: fade-in 0.3s ease-out;
`;

export const fadeOutAnimation = `
  animation: fade-out 0.3s ease-in;
`;

export const bounceInAnimation = `
  animation: bounce-in 0.5s ease-out;
`;

export const shakeAnimation = `
  animation: shake 0.5s ease-in-out;
`;

export const pulseAnimation = `
  animation: pulse 2s ease-in-out infinite;
`;
