import { Size } from '../../types/common';
import { PaginationVariant } from './Pagination.types';

export const paginationVariants: Record<PaginationVariant, {
  container: string;
  button: string;
  activeButton: string;
  disabledButton: string;
}> = {
  default: {
    container: 'flex items-center gap-1',
    button: `
      inline-flex items-center justify-center
      border border-gray-300 bg-white text-gray-700
      hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none
    `,
    activeButton: `
      inline-flex items-center justify-center
      border border-blue-600 bg-blue-600 text-white
      hover:bg-blue-700 hover:border-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none
    `,
    disabledButton: `
      inline-flex items-center justify-center
      border border-gray-200 bg-gray-50 text-gray-400
      cursor-not-allowed
      font-medium select-none
    `
  },
  outline: {
    container: 'flex items-center gap-1',
    button: `
      inline-flex items-center justify-center
      border border-gray-300 bg-transparent text-gray-700
      hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none
    `,
    activeButton: `
      inline-flex items-center justify-center
      border border-blue-600 bg-blue-50 text-blue-700
      hover:bg-blue-100 hover:border-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none
    `,
    disabledButton: `
      inline-flex items-center justify-center
      border border-gray-200 bg-transparent text-gray-400
      cursor-not-allowed
      font-medium select-none
    `
  },
  minimal: {
    container: 'flex items-center gap-1',
    button: `
      inline-flex items-center justify-center
      border border-transparent bg-transparent text-gray-600
      hover:bg-gray-100 hover:text-gray-900
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none
    `,
    activeButton: `
      inline-flex items-center justify-center
      border border-transparent bg-blue-100 text-blue-700
      hover:bg-blue-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none
    `,
    disabledButton: `
      inline-flex items-center justify-center
      border border-transparent bg-transparent text-gray-300
      cursor-not-allowed
      font-medium select-none
    `
  },
  pills: {
    container: 'flex items-center gap-2',
    button: `
      inline-flex items-center justify-center
      border border-transparent bg-gray-100 text-gray-700
      hover:bg-gray-200 hover:text-gray-900
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none rounded-full
    `,
    activeButton: `
      inline-flex items-center justify-center
      border border-transparent bg-blue-600 text-white
      hover:bg-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-all duration-200 ease-in-out
      font-medium select-none rounded-full
    `,
    disabledButton: `
      inline-flex items-center justify-center
      border border-transparent bg-gray-50 text-gray-400
      cursor-not-allowed
      font-medium select-none rounded-full
    `
  }
};

export const paginationSizes: Record<Size, {
  button: string;
  icon: string;
  text: string;
  input: string;
}> = {
  sm: {
    button: 'h-8 min-w-[32px] px-2 text-sm rounded',
    icon: 'w-3 h-3',
    text: 'text-xs',
    input: 'h-8 w-16 px-2 text-sm rounded border border-gray-300'
  },
  md: {
    button: 'h-10 min-w-[40px] px-3 text-sm rounded-md',
    icon: 'w-4 h-4',
    text: 'text-sm',
    input: 'h-10 w-20 px-3 text-sm rounded-md border border-gray-300'
  },
  lg: {
    button: 'h-12 min-w-[48px] px-4 text-base rounded-md',
    icon: 'w-5 h-5',
    text: 'text-base',
    input: 'h-12 w-24 px-4 text-base rounded-md border border-gray-300'
  },
  xl: {
    button: 'h-14 min-w-[56px] px-5 text-lg rounded-lg',
    icon: 'w-6 h-6',
    text: 'text-lg',
    input: 'h-14 w-28 px-5 text-lg rounded-lg border border-gray-300'
  }
};

export const ellipsisStyles = 'inline-flex items-center justify-center text-gray-500 font-medium select-none';

export const pageInfoStyles = 'text-gray-600 font-medium';

export const jumpToStyles = 'flex items-center gap-2 text-gray-600 font-medium';