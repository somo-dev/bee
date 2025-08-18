import { Size, Variant, BaseComponentProps } from "../index";

export const switchStyles = {
  track: {
    base: `
      relative inline-flex items-center bg-gray-200 rounded-full
      transition-all duration-200 ease-in-out cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      select-none
    `,
    checked: `
      bg-blue-600
    `,
    disabled: `
      bg-gray-100 cursor-not-allowed opacity-50
    `,
  },
  thumb: {
    base: `
      absolute left-0.5 right-0.5 bg-white rounded-full shadow-md
      transition-all duration-200 ease-in-out transform
      flex items-center justify-center cursor-pointer
      select-none
    `,
    checked: `
      translate-x-full
    `,
    disabled: `
      bg-gray-50
    `,
  },
};

export const switchSizes: Record<
  Size,
  {
    track: string;
    thumb: string;
    label: string;
    innerLabel: string;
    gap: string;
  }
> = {
  sm: {
    track: "w-8 h-5",
    thumb: "w-3 h-3",
    label: "text-sm",
    innerLabel: "text-xs",
    gap: "gap-2",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-4 h-4",
    label: "text-sm",
    innerLabel: "text-xs",
    gap: "gap-3",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-5 h-5",
    label: "text-base",
    innerLabel: "text-sm",
    gap: "gap-3",
  },
  xl: {
    track: "w-16 h-8",
    thumb: "w-6 h-6",
    label: "text-lg",
    innerLabel: "text-base",
    gap: "gap-4",
  },
};

export const labelStyles = `
  font-medium text-gray-900 cursor-pointer select-none
`;

export const descriptionStyles = `
  text-gray-600 mt-1
`;

export const errorStyles = `
  text-red-600 mt-1
`;

export const requiredIndicatorStyles = `
  text-red-500 ml-1
`;

export const innerLabelStyles = `
  absolute inset-0 flex items-center justify-center
  font-medium transition-all duration-200 ease-in-out
  pointer-events-none select-none
`;

export const onLabelStyles = `
  left-2 justify-start
`;

export const offLabelStyles = `
  right-2 justify-end
`;

// Animation keyframes
export const switchAnimations = `
  @keyframes switchBounce {
    0%, 20%, 53%, 80%, 100% {
      transform: scale(1);
    }
    40%, 43% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(1.05);
    }
    90% {
      transform: scale(1.02);
    }
  }
  
  @keyframes switchSlide {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(50%) scale(1.1);
    }
    100% {
      transform: translateX(100%);
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
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

export const switchBounceAnimation = `
  animation: switchBounce 0.6s ease-in-out;
`;

export const switchSlideAnimation = `
  animation: switchSlide 0.3s ease-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;
