import { Size } from "../../types/common";
import { CheckboxVariant } from "./Checkbox.types";

export const checkboxVariants: Record<
  CheckboxVariant,
  {
    base: string;
    checked: string;
    indeterminate: string;
    disabled: string;
  }
> = {
  default: {
    base: `
      border-2 border-gray-400 bg-white
      hover:border-gray-500
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    checked: `
      border-blue-600 bg-blue-600
      hover:border-blue-700 hover:bg-blue-700
    `,
    indeterminate: `
      border-blue-600 bg-blue-600
      hover:border-blue-700 hover:bg-blue-700
    `,
    disabled: `
      border-gray-300 bg-gray-50 cursor-not-allowed
      hover:border-gray-300 hover:bg-gray-50
    `,
  },
  filled: {
    base: `
      border-2 border-transparent bg-gray-100
      hover:bg-gray-200
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    checked: `
      border-blue-600 bg-blue-600
      hover:border-blue-700 hover:bg-blue-700
    `,
    indeterminate: `
      border-blue-600 bg-blue-600
      hover:border-blue-700 hover:bg-blue-700
    `,
    disabled: `
      border-transparent bg-gray-100 cursor-not-allowed
      hover:bg-gray-100
    `,
  },
  outline: {
    base: `
      border-2 border-gray-400 bg-transparent
      hover:border-gray-500 hover:bg-gray-50
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    checked: `
      border-blue-600 bg-transparent
      hover:border-blue-700 hover:bg-transparent
    `,
    indeterminate: `
      border-blue-600 bg-transparent
      hover:border-blue-700 hover:bg-transparent
    `,
    disabled: `
      border-gray-200 bg-transparent cursor-not-allowed
      hover:border-gray-200 hover:bg-transparent
    `,
  },
};

export const checkboxSizes: Record<
  Size,
  {
    checkbox: string;
    icon: string;
    label: string;
    description: string;
    gap: string;
  }
> = {
  sm: {
    checkbox: "w-4 h-4",
    icon: "w-2.5 h-2.5",
    label: "text-sm",
    description: "text-xs",
    gap: "gap-2",
  },
  md: {
    checkbox: "w-5 h-5",
    icon: "w-3 h-3",
    label: "text-sm",
    description: "text-xs",
    gap: "gap-3",
  },
  lg: {
    checkbox: "w-6 h-6",
    icon: "w-4 h-4",
    label: "text-base",
    description: "text-sm",
    gap: "gap-3",
  },
  xl: {
    checkbox: "w-7 h-7",
    icon: "w-5 h-5",
    label: "text-lg",
    description: "text-base",
    gap: "gap-4",
  },
};

export const baseCheckboxStyles = `
  relative inline-flex items-center justify-center
  rounded cursor-pointer
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
  block font-medium text-gray-900 mb-2
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

// Animation keyframes
export const checkboxAnimations = `
  @keyframes checkboxCheck {
    0% {
      transform: scale(0) rotate(45deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(45deg);
      opacity: 1;
    }
  }
  
  @keyframes checkboxIndeterminate {
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
  
  @keyframes checkboxBounce {
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
`;

export const iconAnimationStyles = `
  animation: checkboxCheck 0.2s ease-in-out;
`;

export const indeterminateAnimationStyles = `
  animation: checkboxIndeterminate 0.2s ease-in-out;
`;

export const bounceAnimationStyles = `
  animation: checkboxBounce 0.6s ease-in-out;
`;
