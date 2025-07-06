import { Size } from "../../types/common";
import { PasswordInputVariant } from "./PasswordInput.types";

export const passwordInputVariants: Record<
  PasswordInputVariant,
  {
    input: string;
    wrapper: string;
  }
> = {
  default: {
    input: `
      bg-white border border-gray-300
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400
    `,
    wrapper: `
      relative
    `,
  },
  filled: {
    input: `
      bg-gray-50 border border-transparent
      hover:bg-gray-100
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:bg-gray-100 disabled:text-gray-400
    `,
    wrapper: `
      relative
    `,
  },
  outline: {
    input: `
      bg-transparent border-2 border-gray-300
      hover:border-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
      disabled:border-gray-200 disabled:text-gray-400
    `,
    wrapper: `
      relative
    `,
  },
};

export const passwordInputSizes: Record<
  Size,
  {
    input: string;
    icon: string;
    padding: string;
    text: string;
  }
> = {
  sm: {
    input: "h-8 text-sm",
    icon: "w-4 h-4",
    padding: "px-3 py-1",
    text: "text-sm",
  },
  md: {
    input: "h-10 text-sm",
    icon: "w-4 h-4",
    padding: "px-3 py-2",
    text: "text-sm",
  },
  lg: {
    input: "h-12 text-base",
    icon: "w-5 h-5",
    padding: "px-4 py-3",
    text: "text-base",
  },
  xl: {
    input: "h-14 text-lg",
    icon: "w-6 h-6",
    padding: "px-5 py-4",
    text: "text-lg",
  },
};

export const otpInputSizes: Record<
  Size,
  {
    input: string;
    text: string;
    gap: string;
  }
> = {
  sm: {
    input: "w-8 h-8 text-sm",
    text: "text-sm",
    gap: "gap-2",
  },
  md: {
    input: "w-12 h-12 text-base",
    text: "text-sm",
    gap: "gap-3",
  },
  lg: {
    input: "w-14 h-14 text-lg",
    text: "text-base",
    gap: "gap-4",
  },
  xl: {
    input: "w-16 h-16 text-xl",
    text: "text-lg",
    gap: "gap-5",
  },
};

export const baseInputStyles = `
  w-full rounded-md transition-all duration-200 ease-in-out
  focus:outline-none
  font-medium
`;

export const baseOTPInputStyles = `
  text-center rounded-md transition-all duration-200 ease-in-out
  focus:outline-none
  font-mono font-bold
  border-2
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

export const toggleButtonStyles = `
  text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200 cursor-pointer rounded hover:bg-gray-100
`;

export const strengthMeterStyles = `
  mt-2 h-1 bg-gray-200 rounded-full overflow-hidden
`;

export const strengthBarStyles = `
  h-full transition-all duration-300 ease-in-out rounded-full
`;

export const strengthColors = {
  0: "bg-gray-300",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-green-500",
  5: "bg-green-600",
};

export const strengthLabels = {
  0: "No password",
  1: "Very weak",
  2: "Weak",
  3: "Fair",
  4: "Good",
  5: "Strong",
};

export const leftSectionStyles = `
  absolute left-3 top-1/2 transform -translate-y-1/2
  text-gray-400
  pointer-events-none
`;

export const rightSectionStyles = `
  absolute right-3 top-1/2 transform -translate-y-1/2
  text-gray-400
`;

// Animation keyframes
export const inputAnimations = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const shakeAnimation = `
  animation: shake 0.5s ease-in-out;
`;

export const pulseAnimation = `
  animation: pulse 1s ease-in-out infinite;
`;

export const slideInAnimation = `
  animation: slideIn 0.3s ease-out;
`;
