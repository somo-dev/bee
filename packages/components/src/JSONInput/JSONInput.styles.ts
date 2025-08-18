import { Size, Variant, BaseComponentProps } from "../index";
import { JSONInputVariant } from "./JSONInput.types";

export const jsonInputVariants: Record<
  JSONInputVariant,
  {
    container: string;
    input: string;
    lineNumbers: string;
  }
> = {
  default: {
    container: `
      relative bg-white border border-gray-300 rounded-lg
      focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    input: `
      w-full bg-transparent border-none outline-none resize-none
      font-mono text-sm leading-relaxed
      placeholder-gray-400
    `,
    lineNumbers: `
      bg-gray-50 border-r border-gray-200 text-gray-400
      font-mono text-sm leading-relaxed
      select-none pointer-events-none
      flex flex-col items-end
    `,
  },
  filled: {
    container: `
      relative bg-gray-50 border border-transparent rounded-lg
      focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    input: `
      w-full bg-transparent border-none outline-none resize-none
      font-mono text-sm leading-relaxed
      placeholder-gray-400
    `,
    lineNumbers: `
      bg-gray-100 border-r border-gray-300 text-gray-400
      font-mono text-sm leading-relaxed
      select-none pointer-events-none
      flex flex-col items-end
    `,
  },
  outline: {
    container: `
      relative bg-transparent border-2 border-gray-300 rounded-lg
      focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20
      transition-all duration-200 ease-in-out
    `,
    input: `
      w-full bg-transparent border-none outline-none resize-none
      font-mono text-sm leading-relaxed
      placeholder-gray-400
    `,
    lineNumbers: `
      bg-gray-50 border-r-2 border-gray-300 text-gray-400
      font-mono text-sm leading-relaxed
      select-none pointer-events-none
      flex flex-col items-end
    `,
  },
};

export const jsonInputSizes: Record<
  Size,
  {
    container: string;
    input: string;
    text: string;
    padding: string;
    lineNumbers: string;
    toolbar: string;
  }
> = {
  sm: {
    container: "text-xs",
    input: "text-xs leading-5",
    text: "text-xs",
    padding: "p-2",
    lineNumbers: "px-2 py-2 text-xs leading-5",
    toolbar: "p-2 gap-1",
  },
  md: {
    container: "text-sm",
    input: "text-sm leading-6",
    text: "text-sm",
    padding: "p-3",
    lineNumbers: "px-3 py-3 text-sm leading-6",
    toolbar: "p-3 gap-2",
  },
  lg: {
    container: "text-base",
    input: "text-base leading-7",
    text: "text-base",
    padding: "p-4",
    lineNumbers: "px-4 py-4 text-base leading-7",
    toolbar: "p-4 gap-2",
  },
  xl: {
    container: "text-lg",
    input: "text-lg leading-8",
    text: "text-lg",
    padding: "p-5",
    lineNumbers: "px-5 py-5 text-lg leading-8",
    toolbar: "p-5 gap-3",
  },
};

export const baseContainerStyles = `
  relative overflow-hidden
  transition-all duration-200 ease-in-out
`;

export const inputContainerStyles = `
  relative flex
`;

export const overlayStyles = `
  absolute inset-0 pointer-events-none
  font-mono whitespace-pre-wrap
  overflow-hidden
`;

export const labelStyles = `
  block font-medium text-gray-700 mb-2
`;

export const descriptionStyles = `
  text-gray-600 mt-1
`;

export const errorStyles = `
  text-red-600 mt-1
`;

export const toolbarStyles = `
  flex items-center justify-between
  bg-gray-50 border-b border-gray-200
`;

export const toolbarButtonStyles = `
  inline-flex items-center gap-1 px-2 py-1
  text-gray-600 hover:text-gray-900 hover:bg-gray-100
  rounded transition-all duration-200
  text-xs font-medium
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
`;

export const statusIndicatorStyles = `
  flex items-center gap-2 text-xs font-medium
`;

export const validStatusStyles = `
  text-green-600
`;

export const invalidStatusStyles = `
  text-red-600
`;

export const neutralStatusStyles = `
  text-gray-500
`;

export const lineNumberStyles = `
  min-w-[3rem] text-right pr-2
  border-r border-gray-200
`;

// Syntax highlighting colors
export const syntaxColors = {
  string: "#22c55e", // green-500
  number: "#3b82f6", // blue-500
  boolean: "#f59e0b", // amber-500
  null: "#6b7280", // gray-500
  key: "#8b5cf6", // violet-500
  punctuation: "#374151", // gray-700
  comment: "#9ca3af", // gray-400
  error: "#ef4444", // red-500
};

export const defaultTheme = {
  background: "#0000",
  text: "#A31414",
  string: syntaxColors.string,
  number: syntaxColors.number,
  boolean: syntaxColors.boolean,
  null: syntaxColors.null,
  key: syntaxColors.key,
  punctuation: syntaxColors.punctuation,
  comment: syntaxColors.comment,
};

export const darkTheme = {
  background: "#1f2937",
  text: "#f9fafb",
  string: "#34d399",
  number: "#60a5fa",
  boolean: "#fbbf24",
  null: "#9ca3af",
  key: "#a78bfa",
  punctuation: "#d1d5db",
  comment: "#6b7280",
};

// Animation keyframes
export const jsonInputAnimations = `
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
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  @keyframes success {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const slideInAnimation = `
  animation: slideIn 0.2s ease-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;

export const shakeAnimation = `
  animation: shake 0.5s ease-in-out;
`;

export const successAnimation = `
  animation: success 0.4s ease-out;
`;
