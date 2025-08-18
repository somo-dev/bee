import { Size, Variant } from "../index";

export const buttonVariants: Record<Variant, string> = {
  primary: `
    bg-[#6366F1] text-white border-[#6366F1]
    hover:bg-[#5855EB] hover:border-[#5855EB]
    focus:ring-[#6366F1] focus:bg-[#5855EB]
    active:bg-[#4F46E5]
    disabled:bg-[#A5B4FC] disabled:border-[#A5B4FC] disabled:cursor-not-allowed
  `,
  secondary: `
    bg-gray-100 text-gray-900 border-gray-300
    hover:bg-gray-200 hover:border-gray-400
    focus:ring-gray-500 focus:bg-gray-200
    active:bg-gray-300
    disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
  `,
  outline: `
    bg-transparent text-[#6366F1] border-[#6366F1]
    hover:bg-[#6366F1] hover:text-white
    focus:ring-[#6366F1] focus:bg-[#6366F1] focus:text-white
    active:bg-[#5855EB]
    disabled:text-[#A5B4FC] disabled:border-[#A5B4FC] disabled:cursor-not-allowed
  `,
  ghost: `
    bg-transparent text-gray-700 border-transparent
    hover:bg-gray-100 hover:text-gray-900
    focus:ring-gray-500 focus:bg-gray-100
    active:bg-gray-200
    disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  danger: `
    bg-red-600 text-white border-red-600
    hover:bg-red-700 hover:border-red-700
    focus:ring-red-500 focus:bg-red-700
    active:bg-red-800
    disabled:bg-red-300 disabled:border-red-300 disabled:cursor-not-allowed
  `,
};

export const buttonSizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm font-medium min-h-[32px]",
  md: "px-4 py-2 text-sm font-medium min-h-[40px]",
  lg: "px-6 py-2.5 text-base font-medium min-h-[44px]",
  xl: "px-8 py-3 text-base font-medium min-h-[48px]",
};

export const iconSizes: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-5 h-5",
};

export const baseButtonStyles = `
  inline-flex items-center justify-center
  border rounded-md
  transition-all duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  font-medium
  select-none
  disabled:pointer-events-none
`;
