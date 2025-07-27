import { Size } from "../../types/common";
import { RadioVariant } from "./Radio.types";

export const radioVariants: Record<
  RadioVariant,
  {
    base: string;
    checked: string;
    disabled: string;
    dot: string;
  }
> = {
  filled: {
    base: `
      border-2 border-gray-300 bg-white rounded-full
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    checked: `
      border-blue-600 bg-blue-600
      hover:border-blue-700 hover:bg-blue-700
    `,
    disabled: `
      border-gray-200 bg-gray-50 cursor-not-allowed
      hover:border-gray-200 hover:bg-gray-50
    `,
    dot: `
      w-2 h-2 bg-white rounded-full
      transform scale-0 transition-transform duration-200 ease-out
    `,
  },
  outlined: {
    base: `
      border border-gray-300 bg-white rounded-full
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    checked: `
      border-blue-600 bg-white
      hover:border-blue-700
    `,
    disabled: `
      border-gray-200 bg-gray-50 cursor-not-allowed
      hover:border-gray-200 hover:bg-gray-50
    `,
    dot: `
      w-2 h-2 bg-blue-600 rounded-full
      transform scale-0 transition-transform duration-200 ease-out
    `,
  },
};

export const radioSizes: Record<
  Size,
  {
    radio: string;
    dot: string;
    label: string;
    description: string;
    gap: string;
  }
> = {
  sm: {
    radio: "w-4 h-4",
    dot: "w-1.5 h-1.5",
    label: "text-sm",
    description: "text-xs",
    gap: "gap-2",
  },
  md: {
    radio: "w-5 h-5",
    dot: "w-2 h-2",
    label: "text-sm",
    description: "text-xs",
    gap: "gap-3",
  },
  lg: {
    radio: "w-6 h-6",
    dot: "w-2.5 h-2.5",
    label: "text-base",
    description: "text-sm",
    gap: "gap-3",
  },
  xl: {
    radio: "w-7 h-7",
    dot: "w-3 h-3",
    label: "text-lg",
    description: "text-base",
    gap: "gap-4",
  },
};

export const baseRadioStyles = `
  relative inline-flex items-center justify-center
  cursor-pointer
  focus:outline-none
  flex-shrink-0
`;

export const labelStyles = `
  font-medium text-gray-900 cursor-pointer
  select-none
`;

export const descriptionStyles = `
  text-gray-600 mt-1
`;

export const errorStyles = `
  text-red-600 mt-1
`;

export const groupStyles = `
  space-y-1
`;

export const groupLabelStyles = `
  block font-medium text-gray-900 mb-1
`;

export const groupDescriptionStyles = `
  text-gray-600 text-sm mb-3
`;

export const groupErrorStyles = `
  text-red-600 text-sm mt-2
`;

export const groupSpacing: Record<Size, string> = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-5",
};

export const checkedDotStyles = `
  transform scale-100
`;

export const requiredIndicatorStyles = `
  text-red-500 ml-1
`;

// Animation keyframes
export const radioAnimations = `
  @keyframes radioCheck {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes radioUncheck {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
  
  @keyframes radioBounce {
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
`;

export const checkAnimation = `
  animation: radioCheck 0.3s ease-out;
`;

export const uncheckAnimation = `
  animation: radioUncheck 0.2s ease-in;
`;

export const bounceAnimation = `
  animation: radioBounce 0.6s ease-in-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;
