import { Size, Variant, BaseComponentProps } from "../index";
import { TextareaVariant, TextareaResize } from "./Textarea.types";

export const textareaVariants: Record<
  TextareaVariant,
  {
    wrapper: string;
    textarea: string;
    label: string;
    description: string;
    error: string;
  }
> = {
  default: {
    wrapper: "relative",
    textarea: `
      w-full bg-white border border-gray-300 rounded-md
      placeholder-gray-400 text-gray-900
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:bg-gray-50 read-only:cursor-default
      transition-all duration-200 ease-in-out
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm mb-3",
    error: "text-red-600 text-sm mt-1",
  },
  filled: {
    wrapper: "relative",
    textarea: `
      w-full bg-gray-50 border border-transparent rounded-md
      placeholder-gray-400 text-gray-900
      hover:bg-gray-100
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:bg-gray-100 read-only:cursor-default
      transition-all duration-200 ease-in-out
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm mb-3",
    error: "text-red-600 text-sm mt-1",
  },
  outline: {
    wrapper: "relative",
    textarea: `
      w-full bg-transparent border-2 border-gray-300 rounded-md
      placeholder-gray-400 text-gray-900
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:cursor-default
      transition-all duration-200 ease-in-out
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm mb-3",
    error: "text-red-600 text-sm mt-1",
  },
  unstyled: {
    wrapper: "relative",
    textarea: `
      w-full bg-transparent border-none
      placeholder-gray-400 text-gray-900
      focus:outline-none
      disabled:text-gray-400 disabled:cursor-not-allowed
      read-only:cursor-default
    `,
    label: "block font-medium text-gray-700 mb-1",
    description: "text-gray-600 text-sm mb-3",
    error: "text-red-600 text-sm mt-1",
  },
};

export const textareaSizes: Record<
  Size,
  {
    textarea: string;
    text: string;
    padding: string;
    minHeight: string;
  }
> = {
  sm: {
    textarea: "text-sm",
    text: "text-sm",
    padding: "px-3 py-2",
    minHeight: "min-h-[80px]",
  },
  md: {
    textarea: "text-sm",
    text: "text-sm",
    padding: "px-3 py-2",
    minHeight: "min-h-[100px]",
  },
  lg: {
    textarea: "text-base",
    text: "text-base",
    padding: "px-4 py-3",
    minHeight: "min-h-[120px]",
  },
  xl: {
    textarea: "text-lg",
    text: "text-lg",
    padding: "px-5 py-4",
    minHeight: "min-h-[140px]",
  },
};

export const textareaResize: Record<TextareaResize, string> = {
  none: "resize-none",
  both: "resize",
  horizontal: "resize-x",
  vertical: "resize-y",
  auto: "resize-none overflow-hidden", // Will be handled by autosize
};

export const requiredIndicatorStyles = `
  text-red-500 ml-1
`;

export const characterCountStyles = `
  text-xs text-gray-500
`;

export const errorWithCountStyles = `
  flex items-center justify-between mt-1
`;

// Animation keyframes
export const textareaAnimations = `
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
  
  @keyframes expand {
    from {
      height: var(--from-height);
    }
    to {
      height: var(--to-height);
    }
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

export const expandAnimation = `
  animation: expand 0.2s ease-out;
`;
