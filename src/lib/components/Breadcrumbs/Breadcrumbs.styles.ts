import { Size } from '../../types/common';
import { BreadcrumbVariant, BreadcrumbSeparator } from './Breadcrumbs.types';

export const breadcrumbVariants: Record<BreadcrumbVariant, string> = {
  default: `
    flex items-center space-x-1
  `,
  pills: `
    flex items-center space-x-2
  `,
  minimal: `
    flex items-center space-x-1
  `,
  cards: `
    flex items-center space-x-3
  `
};

export const breadcrumbSizes: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
};

export const breadcrumbItemStyles: Record<BreadcrumbVariant, {
  link: string;
  current: string;
  disabled: string;
}> = {
  default: {
    link: `
      text-gray-500 hover:text-gray-700 
      transition-colors duration-200 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm
      underline-offset-2 hover:underline
    `,
    current: `
      text-gray-900 font-medium
    `,
    disabled: `
      text-gray-300 cursor-not-allowed
    `
  },
  pills: {
    link: `
      px-3 py-1.5 rounded-full
      bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
    `,
    current: `
      px-3 py-1.5 rounded-full
      bg-blue-100 text-blue-800 font-medium
    `,
    disabled: `
      px-3 py-1.5 rounded-full
      bg-gray-50 text-gray-300 cursor-not-allowed
    `
  },
  minimal: {
    link: `
      text-gray-400 hover:text-gray-600
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm
    `,
    current: `
      text-gray-700 font-medium
    `,
    disabled: `
      text-gray-200 cursor-not-allowed
    `
  },
  cards: {
    link: `
      px-3 py-2 rounded-lg border border-gray-200
      bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300
      transition-all duration-200 shadow-sm hover:shadow
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
    `,
    current: `
      px-3 py-2 rounded-lg border border-blue-200
      bg-blue-50 text-blue-800 font-medium shadow-sm
    `,
    disabled: `
      px-3 py-2 rounded-lg border border-gray-100
      bg-gray-50 text-gray-300 cursor-not-allowed
    `
  }
};

export const separatorStyles: Record<BreadcrumbSeparator, string> = {
  slash: 'text-gray-400 mx-2',
  chevron: 'text-gray-400 mx-1',
  arrow: 'text-gray-400 mx-2',
  dot: 'text-gray-400 mx-3',
  custom: 'mx-2'
};

export const iconSizes: Record<Size, string> = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6'
};

export const ellipsisButtonStyles = `
  px-2 py-1 rounded-md
  text-gray-500 hover:text-gray-700 hover:bg-gray-100
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
  cursor-pointer
`;