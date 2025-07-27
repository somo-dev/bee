import { Size } from "../../types/common";
import { InputVariant } from "./Input.types";

export const inputVariants: Record<
  InputVariant,
  {
    wrapper: string;
    input: string;
    label: string;
    description: string;
    error: string;
  }
> = {
  default: {
    wrapper: "relative",
    input: `
      w-full bg-white border border-gray-300 rounded-md
      placeholder-gray-400 text-gray-900
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:bg-gray-50 read-only:cursor-default
      transition-all duration-200 ease-in-out
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm my-1",
    error: "text-red-600 text-sm mt-1",
  },
  filled: {
    wrapper: "relative",
    input: `
      w-full bg-gray-50 border border-transparent rounded-md
      placeholder-gray-400 text-gray-900
      hover:bg-gray-100
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:bg-gray-100 read-only:cursor-default
      transition-all duration-200 ease-in-out
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm my-1",
    error: "text-red-600 text-sm mt-1",
  },
  outline: {
    wrapper: "relative",
    input: `
      w-full bg-transparent border-2 border-gray-300 rounded-md
      placeholder-gray-400 text-gray-900
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:cursor-default
      transition-all duration-200 ease-in-out
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm my-1",
    error: "text-red-600 text-sm mt-1",
  },
  unstyled: {
    wrapper: "relative",
    input: `
      w-full bg-transparent border-none
      placeholder-gray-400 text-gray-900
      focus:outline-none
      disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:cursor-default
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm my-1",
    error: "text-red-600 text-sm mt-1",
  },
};

export const inputSizes: Record<
  Size,
  {
    input: string;
    text: string;
    padding: string;
    leftPadding: string;
    rightPadding: string;
    icon: string;
  }
> = {
  sm: {
    input: "h-8 text-sm",
    text: "text-sm",
    padding: "px-3 py-1",
    leftPadding: "pl-10",
    rightPadding: "pr-10",
    icon: "w-4 h-4",
  },
  md: {
    input: "h-10 text-sm",
    text: "text-sm",
    padding: "px-3 py-2",
    leftPadding: "pl-10",
    rightPadding: "pr-10",
    icon: "w-4 h-4",
  },
  lg: {
    input: "h-12 text-base",
    text: "text-base",
    padding: "px-4 py-3",
    leftPadding: "pl-12",
    rightPadding: "pr-12",
    icon: "w-5 h-5",
  },
  xl: {
    input: "h-14 text-lg",
    text: "text-lg",
    padding: "px-5 py-4",
    leftPadding: "pl-14",
    rightPadding: "pr-14",
    icon: "w-6 h-6",
  },
};

export const leftSectionStyles = `
  absolute left-3 top-1/2 transform -translate-y-1/2
  text-gray-400 pointer-events-none
  flex items-center justify-center
`;

export const rightSectionStyles = `
  absolute right-3 top-1/2 transform -translate-y-1/2
  text-gray-400
  flex items-center justify-center
`;

export const validationIconStyles = `
  absolute right-3 top-1/2 transform -translate-y-1/2
  flex items-center justify-center
`;

export const characterCountStyles = `
  text-xs text-gray-500 ml-2
`;

export const requiredIndicatorStyles = `
  text-red-500 ml-1
`;

export const errorWithCountStyles = `
  flex items-center justify-between mt-1
`;

export const numberInputStyles = `
  [&::-webkit-outer-spin-button]:mr-2
  [&::-webkit-inner-spin-button]:mr-2
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none
`;
// Animation keyframes
export const inputAnimations = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
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
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

export const shakeAnimation = `
  animation: shake 0.5s ease-in-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;
