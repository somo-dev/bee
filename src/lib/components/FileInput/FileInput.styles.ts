import { Size } from "../../types/common";
import { FileInputVariant } from "./FileInput.types";

export const fileInputVariants: Record<
  FileInputVariant,
  {
    wrapper: string;
    input: string;
    button: string;
    dropzone: string;
    activeDropzone: string;
    errorDropzone: string;
  }
> = {
  button: {
    wrapper: "relative inline-block",
    input: "sr-only",
    button: `
      inline-flex items-center justify-center gap-2
      px-4 py-2 bg-white border border-gray-300 rounded-md
      text-gray-700 font-medium cursor-pointer
      hover:bg-gray-50 hover:border-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
      transition-all duration-200 ease-in-out
    `,
    dropzone: "",
    activeDropzone: "",
    errorDropzone: "",
  },
  dropzone: {
    wrapper: "relative",
    input: "sr-only",
    button: "",
    dropzone: `
      relative flex flex-col items-center justify-center
      border-2 border-dashed border-gray-300 rounded-lg
      bg-gray-50 hover:bg-gray-100
      cursor-pointer transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    `,
    activeDropzone: `
      border-blue-400 bg-blue-50 text-blue-700
    `,
    errorDropzone: `
      border-red-400 bg-red-50 text-red-700
    `,
  },
};

export const fileInputSizes: Record<
  Size,
  {
    button: string;
    dropzone: string;
    text: string;
    icon: string;
    preview: string;
    height: string;
  }
> = {
  sm: {
    button: "px-3 py-1.5 text-sm",
    dropzone: "p-4 min-h-[120px]",
    text: "text-sm",
    icon: "w-4 h-4",
    preview: "text-xs",
    height: "120px",
  },
  md: {
    button: "px-4 py-2 text-sm",
    dropzone: "p-6 min-h-[160px]",
    text: "text-sm",
    icon: "w-5 h-5",
    preview: "text-sm",
    height: "160px",
  },
  lg: {
    button: "px-6 py-3 text-base",
    dropzone: "p-8 min-h-[200px]",
    text: "text-base",
    icon: "w-6 h-6",
    preview: "text-base",
    height: "200px",
  },
  xl: {
    button: "px-8 py-4 text-lg",
    dropzone: "p-10 min-h-[240px]",
    text: "text-lg",
    icon: "w-8 h-8",
    preview: "text-lg",
    height: "240px",
  },
};

export const labelStyles = `
  block font-medium text-gray-700 mb-1
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

export const filePreviewStyles = `
  mt-3 space-y-2
`;

export const fileItemStyles = `
  flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md
  transition-all duration-200 hover:bg-gray-100
`;

export const fileInfoStyles = `
  flex items-center gap-3 flex-1 min-w-0
`;

export const fileNameStyles = `
  font-medium text-gray-900 truncate
`;

export const fileSizeStyles = `
  text-gray-500 text-sm
`;

export const removeButtonStyles = `
  p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded
  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500
`;

export const progressBarStyles = `
  absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-md overflow-hidden
`;

export const progressFillStyles = `
  h-full bg-blue-500 transition-all duration-300 ease-out
`;

export const loadingSpinnerStyles = `
  animate-spin text-gray-400
`;

export const dragActiveStyles = `
  border-blue-400 bg-blue-50 text-blue-700
`;

export const dragErrorStyles = `
  border-red-400 bg-red-50 text-red-700
`;

// Animation keyframes
export const fileInputAnimations = `
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
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: scale(1); }
    40%, 43% { transform: scale(1.05); }
    70% { transform: scale(1.02); }
    90% { transform: scale(1.01); }
  }
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const slideInAnimation = `
  animation: slideIn 0.2s ease-out;
`;

export const shakeAnimation = `
  animation: shake 0.5s ease-in-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;

export const bounceAnimation = `
  animation: bounce 0.6s ease-in-out;
`;
